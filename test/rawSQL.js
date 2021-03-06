import mysql from 'promise-mysql';
import dummyData from './dummyData';
import bcrypt from "bcryptjs";

// Template that works in case I need it later, using mocha-chai-as-promised
// it("Doctor can be (R)ead", async ()=>{
//     const result = await SQL.getRows("MEDICO");
//     chai.expect(result[0]).to.deep.equal(rubric.doctorCreated);
// });

/**
 * Database initial state setup
 */
const connect = function () {
    return mysql.createConnection({
        host: process.env.myHost, // NOTE: Must set the environment variable!
        user: process.env.myUser, // NOTE: Must set the environment variable!
        password: process.env.myPass, // NOTE: Must set the environment variable!
        database: process.env.myDb, // NOTE: Must set the environment variable!
    });
};

exports.resetDB = ()=> {
    let connection;
    return connect().then((conn)=>{
        connection=conn;
        return connection.query('DROP TABLE IF EXISTS AppSettings');
    }).then(()=>{
        return connection.query('DROP TABLE IF EXISTS PAGAMENTOS');
    }).then(()=>{
        return connection.query('DROP TABLE IF EXISTS CONSULTA_PACIENTE');
    }).then(()=>{
        return connection.query('DROP TABLE IF EXISTS DADOS_PACIENTE');
    }).then(()=>{
        return connection.query('DROP TABLE IF EXISTS CONVENIO');
    }).then(()=>{
        return connection.query('DROP TABLE IF EXISTS DOC_TYPE');
    }).then(()=>{
        return connection.query('DROP TABLE IF EXISTS MEDICO');
    }).then(()=>{
        connection.query('CREATE TABLE IF NOT EXISTS `AppSettings` (\n' +
            '  `masterPassword` tinytext NOT NULL\n' +
            ') ENGINE=InnoDB;');
    }).then(()=>{
        connection.query('CREATE TABLE IF NOT EXISTS `MEDICO` (\n' +
            '  `login` varchar(15) NOT NULL,\n' +
            '  `senha` tinytext NOT NULL,\n' +
            '  `cpf` char(14) default NULL,\n' +
            '  `crm` int(11) default NULL,\n' +
            '  `end` tinytext,\n' +
            '  `sexo` char(1) default NULL,\n' +
            '  `nome` tinytext,\n' +
            '  `teldono` char(13) default NULL,\n' +
            '  `cidade` varchar(25) default NULL,\n' +
            '  `estado` char(2) default NULL,\n' +
            '  `especialidade` tinytext default NULL,\n' +
            '  PRIMARY KEY  (`login`)\n' +
            ') ENGINE=InnoDB;');
    }).then(()=>{
        return connection.query('CREATE TABLE IF NOT EXISTS `DOC_TYPE` (\n' +
            '  `login` varchar(15) NOT NULL,\n' +
            '  `nome` varchar(20) NOT NULL,\n' +
            '  `conteudo` text,\n' +
            '  PRIMARY KEY  (`login`,`nome`),\n' +
            '  FOREIGN KEY (`login`) REFERENCES `MEDICO` (`login`) ON DELETE CASCADE ON UPDATE CASCADE\n' +
            ') ENGINE=InnoDB;');
    }).then(()=>{
        return connection.query('CREATE TABLE IF NOT EXISTS `CONVENIO` (\n' +
            '  `convenio` varchar(15) NOT NULL,\n' +
            '  `cobrado` decimal(9,2) NOT NULL,\n' +
            '  PRIMARY KEY  (`convenio`)\n' +
            ') ENGINE=InnoDB;');
    }).then(()=>{
        connection.query('CREATE TABLE IF NOT EXISTS `DADOS_PACIENTE` (\n' +
            '  `id` int NOT NULL AUTO_INCREMENT,\n' +
            '  `nome` varchar(100) NOT NULL,\n' +
            '  `nascimento` char(10) NOT NULL,\n' +
            '  `sexo` char(1) NOT NULL,\n' +
            '  `cor` varchar(15) default NULL,\n' +
            '  `estado_civil` varchar(15) default NULL,\n' +
            '  `tel` char(13) default NULL,\n' +
            '  `end` tinytext,\n' +
            '  `profissao` varchar(30) default NULL,\n' +
            '  `naturalidade` varchar(50) default NULL,\n' +
            '  `procedencia` tinytext,\n' +
            '  `indicacao` tinytext,\n' +
            '  `obs` tinytext,\n' +
            '  PRIMARY KEY  (`id`),\n' +
            '  UNIQUE (nome, nascimento)\n' +
            ') ENGINE=InnoDB;');
    }).then(()=>{
        return connection.query('CREATE TABLE IF NOT EXISTS `CONSULTA_PACIENTE` (\n' +
            '  `pac_id` int NOT NULL,\n' +
            '  `login` varchar(15) NOT NULL,\n' +
            '  `anamnese` mediumtext,\n' +
            '  `exame_fisico` mediumtext,\n' +
            '  `hip_diag` text,\n' +
            '  `conduta` text,\n' +
            '  `exames` mediumtext,\n' +
            '  `evolucao` mediumtext,\n' +
            '  `cirurgias` mediumtext,\n' +
            '  PRIMARY KEY (`pac_id`, `login`),\n' +
            '  FOREIGN KEY (`pac_id`) REFERENCES `DADOS_PACIENTE` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,\n' +
            '  FOREIGN KEY (`login`) REFERENCES `MEDICO` (`login`) ON DELETE CASCADE ON UPDATE CASCADE\n' +
            ') ENGINE=InnoDB;');
    }).then(()=>{
        const result = connection.query('CREATE TABLE IF NOT EXISTS `PAGAMENTOS` (\n' +
            '  `pac_id` int NOT NULL,\n' +
            '  `login` varchar(15) NOT NULL,\n' +
            '  `data` date NOT NULL,\n' +
            '  `convenio` varchar(15) NOT NULL,\n' +
            '  `cobrado` decimal(9,2) NOT NULL,\n' +
            '  `recibo` decimal(9,2) NOT NULL,\n' +
            '  PRIMARY KEY (`pac_id`, `login`, `data`),\n' +
            '  FOREIGN KEY (`login`) REFERENCES `MEDICO` (`login`) ON DELETE CASCADE ON UPDATE CASCADE,\n' +
            '  FOREIGN KEY (`pac_id`) REFERENCES `DADOS_PACIENTE` (`id`) ON DELETE CASCADE ON UPDATE CASCADE\n' +
            ') ENGINE=InnoDB;');
        connection.end();
        return result;
    }).catch( (error) => {
        console.log(error);
    });
}

exports.setMasterPasswordDirectly = async ()=> {
    const myPasswd = await bcrypt.hash(dummyData.dummyPassword, 10); // TODO: What's 10?
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO ' +
            'AppSettings ( masterPassword ) ' +
            'VALUES (' +
            "'" + myPasswd +"'"  +
            ')'
        );
        connection.end();
        return result;
    });
}

/**
 * Database controlled stated setup
 */
exports.addDummyDoctorDirectly = async ()=> {
    const myPasswd = await bcrypt.hash(dummyData.dummyPassword, 10); // TODO: What's 10?
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO ' +
            'MEDICO ( login, senha, cpf, crm, end, sexo, nome, teldono, cidade, estado, especialidade ) ' +
            'VALUES (' +
            "'" + dummyData.dummyDoctor.login +"',"  +
            "'" + myPasswd +"',"  +
            "'" + dummyData.dummyDoctor.identityDocument +"',"  +
            dummyData.dummyDoctor.register +","  +
            "'" + dummyData.dummyDoctor.address +"',"  +
            "'" + dummyData.dummyDoctor.gender +"',"  +
            "'" + dummyData.dummyDoctor.name +"',"  +
            "'" + dummyData.dummyDoctor.phone +"',"  +
            "'" + dummyData.dummyDoctor.city +"',"  +
            "'" + dummyData.dummyDoctor.state +"',"  +
            "'" + dummyData.dummyDoctor.specialty  +"'"  +
            ')'
        );
        connection.end();
        return result;
    });
}

exports.addDummySecretaryDirectly = async ()=> {
    const myPasswd = await bcrypt.hash(dummyData.dummyPassword, 10); // TODO: What's 10?
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO ' +
            'MEDICO ( login, senha, cpf, crm, end, sexo, nome, teldono, cidade, estado, especialidade ) ' +
            'VALUES (' +
            "'" + dummyData.dummySecretary.login +"',"  +
            "'" + myPasswd +"',"  +
            "'" + dummyData.dummySecretary.identityDocument +"',"  +
            dummyData.dummySecretary.register +","  +
            "'" + dummyData.dummySecretary.address +"',"  +
            "'" + dummyData.dummySecretary.gender +"',"  +
            "'" + dummyData.dummySecretary.name +"',"  +
            "'" + dummyData.dummySecretary.phone +"',"  +
            "'" + dummyData.dummySecretary.city +"',"  +
            "'" + dummyData.dummySecretary.state +"',"  +
            "'" + dummyData.dummySecretary.specialty  +"'"  +
            ')'
        );
        connection.end();
        return result;
    });
}

exports.addDummyDocTypeDirectly = ()=> {
    return connect().then(function(connection) {
        const result = connection.query(
            'INSERT INTO DOC_TYPE' +
            ' ( login, nome, conteudo ) ' +
            'VALUES (' +
            "'" + dummyData.dummyDocType.login + "'," +
            "'" + dummyData.dummyDocType.name + "'," +
            "'" +  dummyData.dummyDocType.content + "'" +
            ')',
        );
        connection.end();
        return result;
    });
}

exports.addDummyPatientDirectly = ()=> {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO DADOS_PACIENTE' +
            ' ( nome, nascimento, sexo, cor, estado_civil, tel, end, profissao, naturalidade, procedencia, indicacao, obs ) ' +
            'VALUES (' +
            "'" +  dummyData.dummyPatient.name +"',"  +
            "'" + dummyData.dummyPatient.dob +"',"  +
            "'" + dummyData.dummyPatient.gender +"',"  +
            "'" + dummyData.dummyPatient.ethnicity +"',"  +
            "'" + dummyData.dummyPatient.civilStatus +"',"  +
            "'" + dummyData.dummyPatient.phone +"',"  +
            "'" + dummyData.dummyPatient.address +"',"  +
            "'" + dummyData.dummyPatient.profession +"',"  +
            "'" + dummyData.dummyPatient.naturalFrom +"',"  +
            "'" + dummyData.dummyPatient.origin +"',"  +
            "'" + dummyData.dummyPatient.referredBy +"',"  +
            "'" + dummyData.dummyPatient.obs +"'"  +
            ')'
        );
        connection.end();
        return result;
    });

}

exports.addDummyInsuranceProviderDirectly = ()=> {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO CONVENIO' +
            ' ( convenio, cobrado ) ' +
            'VALUES (' +
            "'" + dummyData.dummyInsuranceProvider.name + "',"  +
            (dummyData.dummyInsuranceProvider.amountCharged) +
            ')'
        );
        connection.end();
        return result;
    });
}

exports.addDummyConsultationDirectly = ()=> {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO CONSULTA_PACIENTE' +
            ' ( pac_id, login, anamnese, exame_fisico, hip_diag, conduta, exames, evolucao, cirurgias ) ' +
            'VALUES (' +
            dummyData.dummyConsultation.id +','+
            "'" + dummyData.dummyConsultation.login + "'," +
            "'" +  dummyData.dummyConsultation.anamnesis + "'," +
            "'" + dummyData.dummyConsultation.physical + "'," +
            "'" + dummyData.dummyConsultation.hypothesis + "'," +
            "'" + dummyData.dummyConsultation.conduct + "'," +
            "'" + dummyData.dummyConsultation.examination + "'," +
            "'" + dummyData.dummyConsultation.evolution + "'," +
            "'" + dummyData.dummyConsultation.surgicalProcedures + "'" +
            ')'
        );
        connection.end();
        return result;
    });
}

exports.addDummyPaymentDirectly = ()=> {
    return connect().then(function(connection){
        const result = connection.query(
            'INSERT INTO PAGAMENTOS' +
            ' ( pac_id, login, data, convenio, cobrado, recibo ) ' +
            'VALUES (' +
            dummyData.dummyPayment.id +','+
            "'" + dummyData.dummyPayment.login + "'," +
            "'" + dummyData.dummyPayment.date + "'," +
            "'" + dummyData.dummyPayment.insuranceProviderName + "'," +
            (dummyData.dummyPayment.amountCharged) + ','+
            dummyData.dummyPayment.receipt +
            ')'
        );
        connection.end();
        return result;
    });

}

exports.getRows = function(table, callback) {
    return connect().then(function(connection){
        const result = connection.query("SELECT * FROM " + table);
        connection.end();
        return result;
    });

};