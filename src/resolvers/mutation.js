import bcrypt from  'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserLogin } from '../utils';
import * as Sequelize from "sequelize";
import Db from "../../src_old/db";

const Op = Sequelize.Op;
/*
    Doctor CRUD
 */
async function addDoctor(parent, args, context, info) {
    const passwd = await bcrypt.hash(args.password, 10); // TODO: What's 10?
    const user = await context.db.Doctor.create({
        login: args.login,
        password: passwd,
        identityDocument: args.identityDocument,
        register: args.register,
        address: args.address,
        gender: args.gender,
        name: args.name,
        phone: args.phone,
        city: args.city,
        state: args.state,
        specialty: args.specialty,
    });
    const token = jwt.sign({ userId: user.login}, APP_SECRET);
    return { token, user };
}

async function signIn(parent, args, context, info) {
    const user = await context.db.Doctor.findById(args.login);
    if (!user) throw new Error('No such user found')
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) throw new Error('Wrong password');
    const token = jwt.sign({ userId: user.login}, APP_SECRET);
    return { token, user };
}

function removeDoctor(parent, args, context, info) {
    const login = getUserLogin(context);
    return context.db.Doctor.findById(login).then(doctor => {
        return doctor.destroy();
    }).catch(error => {
        return {Error: error};
    });
}

function updateDoctor(parent, args, context, info) {
    const login = getUserLogin(context);
    return context.db.Doctor.findById(login).then(
        doctor => {
            if (doctor) {
                // Stupid bug forces me to change the name everytime or else it violates nonnull on it!
                // See updatePatient() for the cleaner solution, that doesn't work
                if (args.password) doctor.password = args.password;
                if (args.identifyDocument) doctor.identifyDocument = args.identifyDocument;
                if (args.register) doctor.register = args.register;
                if (args.address) doctor.address = args.address;
                if (args.gender) doctor.gender = args.gender;
                if (args.name) doctor.name = args.name;
                if (args.phone) doctor.phone = args.phone;
                if (args.city) doctor.city = args.city;
                if (args.state) doctor.state = args.state;
                if (args.specialty) doctor.special = args.specialty;

                return doctor.save();
            }
        }
    ).catch(error => {
        return {Error: error};
    });
}

/*
    Patient CRUD
 */

function addPatient(parent, args, context, info) {
    return context.db.Patient.create({
        name: args.name,
        dob: args.dob,
        gender: args.gender,
        ethnicity: args.ethnicity,
        civilStatus: args.civilStatus,
        phone: args.phone,
        address: args.address,
        profession: args.profession,
        naturalFrom: args.naturalFrom,
        origin: args.origin,
        referredBy: args.referredBy,
        obs: args.obs,
    });
}

function updatePatient(parent, args, context, info) {
    return context.db.Patient.findById(args.id).then(
        patient => {
            if (patient) {
                if (args.name) patient.name = args.name;
                if (args.dob) patient.dob = args.dob;
                if (args.gender) patient.gender = args.gender;
                if (args.ethnicity) patient.ethnicity = args.ethnicity;
                if (args.civilStatus) patient.civilStatus = args.civilStatus;
                if (args.phone) patient.phone = args.phone;
                if (args.address) patient.address = args.address;
                if (args.profession) patient.profession = args.profession;
                if (args.naturalFrom) patient.naturalFrom = args.naturalFrom;
                if (args.origin) patient.origin = args.origin;
                if (args.referredBy) patient.referredBy = args.referredBy;
                if (args.obs) patient.obs = args.obs;

                return patient.save(); //.then(patient => { return patient; } );
            }
        }
    ).catch(error => { return {Error: error}; });
}

function removePatient(parent, args, context, info) {
    return context.db.Patient.findById(args.id).then(patient => {
        return patient.destroy();
    }).catch(error => { return {Error: error}; });
}

/*
    Consultation CRUD
 */
function addConsultation(parent, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Consultation.create({
        id: args.id,
        login: myLogin,
        anamnesis: args.anamnesis,
        physical: args.physical,
        hypothesis: args.hypothesis,
        conduct: args.conduct,
        evolution: args.evolution,
        examination: args.examination,
        surgicalProcedures: args.surgicalProcedures
    });
}

function removeConsultation(parent, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Consultation.findOne({
        where: {
            login: { [Op.eq]: myLogin },
            id: { [Op.eq]: args.id }
        }
    }).then(consultation => {
        return consultation.destroy();
    }).catch(error => { return {Error: error}; });
}

function updateConsultation(parent, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.Consultation.findOne({
        where: {
            login: {[Op.eq]: myLogin},
            id: {[Op.eq]: args.id}
        }
    }).then(consultation => {
        if (args.anamnesis) consultation.anamnesis = args.anamnesis;
        if (args.physical) consultation.physical = args.physical;
        if (args.hypothesis) consultation.hypothesis = args.hypothesis;
        if (args.conduct) consultation.conduct = args.conduct;
        if (args.evolution) consultation.evolution = args.evolution;
        if (args.examination) consultation.examination = args.examination;
        if (args.surgicalProcedures) consultation.surgicalProcedures = args.surgicalProcedures;
        return consultation.save();
    }).catch(error => { return {Error: error}; });
}

/*
    InsuranceProvider CRUD
 */
function addInsuranceProvider(parent, args, context, info) {
    return context.db.InsuranceProvider.create({
        name: args.name,
        amountCharged: args.amountCharged
    });
}

function removeInsuranceProvider(parent, args, context, info) {
    return context.db.InsuranceProvider.findOne({where:args}).then(insuranceProvider => {
        return insuranceProvider.destroy();
    }).catch(error => { return {Error: error}; });
}

function updateInsuranceProvider(parent, args, context, info) {
    return context.db.InsuranceProvider.findOne({where:args}).then(
        insuranceProvider => {
            if (insuranceProvider) {
                if (args.amountCharged) insuranceProvider.amountCharged = args.amountCharged;
                return insuranceProvider.save();
            }
        }
    ).catch(error => {
        return {Error: error};
    });
}

/*
    Payment CRUD
 */
function addPayment(parent, args, context, info) {
    return context.db.Payment.create({
        login:args.login,
        date:args.date,
        insuranceProvider:args.insuranceProvider,
        amountCharged:args.amountCharged,
        receipt: args.receipt
    });
}

function removePayment(parent, args, context, info) {
    return Db.models.payment.findOne({
        where: {
            login: {[Op.eq]: args.login},
            id: {[Op.eq]: args.id},
            date: {[Op.eq]: args.date}
        }
    }).then(payment => {
        return payment.destroy();
    }).catch(error => { return {Error: error}; });
}

function updatePayment(parent, args, context, info) {
    return context.db.Payment.findOne({
        where: {
            login: {[Op.eq]: args.login},
            id: {[Op.eq]: args.id},
            date: {[Op.eq]: args.date}
        }
    }).then(
        payment => {
            if (payment) {
                if (args.date) payment.date = args.date;
                if (args.insuranceProvider) payment.insuranceProvider = args.insuranceProvider;
                if (args.amountCharged) payment.amountCharged = args.amountCharged;
                if (args.receipt) payment.receipt = args.receipt;
                return payment.save();
            }
        }
    ).catch(error => {
        return {Error: error};
    });
}

/*
    DocType CRUD
 */
function addDocType(parent, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.DocType.create({
        login: myLogin,
        name: args.name,
        content: args.content
    });
}

function removeDocType(parent, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.DocType.findOne({
        where: {
            login: {[Op.eq]: myLogin},
            name: {[Op.eq]: args.name}
        }
    }).then(docType => {
        return docType.destroy();
    }).catch(error => { return {Error: error}; });
}

function updateDocType(parent, args, context, info) {
    const myLogin = getUserLogin(context);
    return context.db.DocType.findOne({
        where: {
            login: {[Op.eq]: myLogin},
            name: {[Op.eq]: args.name}
        }
    }).then(docType => {
        if (docType) {
            if (args.name) docType.name = args.name;
            if (args.content) docType.content = args.content;
            return docType.save();
        }
    }).catch(error => { return {Error: error}; });
}

// EXPORTS
module.exports = {
    signIn,

    addDoctor,
    removeDoctor,
    updateDoctor,

    addPatient,
    removePatient,
    updatePatient,

    addConsultation,
    removeConsultation,
    updateConsultation,

    addDocType,
    removeDocType,
    updateDocType,

    addPayment,
    removePayment,
    updatePayment,

    addInsuranceProvider,
    removeInsuranceProvider,
    updateInsuranceProvider
};