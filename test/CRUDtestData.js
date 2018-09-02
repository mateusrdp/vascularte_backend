import * as data from 'dummyData';
import {updateSuffix, updateIncrement} from 'sql_table_rubric';
//TODO investigate: can I add a mutation to an (inner) query (e.g: doctor.addPayment()) or can it only be separate (addPayment()) ?

exports.dummyDoctorCreateQuery =
    "mutation { " +
        "addDoctor(" +
            "login: '" + data.dummyDoctor.login + "'," +
            "password: '" + data.dummyDoctor.password + "'," +
            "identityDocument: '" + data.dummyDoctor.identityDocument + "'," +
            "register: " + data.dummyDoctor.register + "," +
            "address: '" + data.dummyDoctor.address + "'," +
            "gender: '" + data.dummyDoctor.gender + "'," +
            "name: '" + data.dummyDoctor.name + "'," +
            "phone: '" + data.dummyDoctor.phone + "'," +
            "city: '" + data.dummyDoctor.city + "'," +
            "state: '" + data.dummyDoctor.state + "'," +
            "specialty: '" + data.dummyDoctor.specialty + "'" +
        ") {" +
            "login," +
            "password," +
            "identityDocument," +
            "register," +
            "address," +
            "gender," +
            "name," +
            "phone," +
            "city," +
            "state," +
            "specialty," +
        "}" +
    "}";
exports.dummyDoctorReadQuery =
    "query { " +
        "doctor(" +
            "login: '" + data.dummyDoctor.login + "'," +
        ") {" +
            "login," +
            "password," +
            "identityDocument," +
            "register," +
            "address," +
            "gender," +
            "name," +
            "phone," +
            "city," +
            "state," +
            "specialty," +
        "}" +
    "}";
exports.dummyDoctorUpdateQuery =
    "mutation { " +
        "updateDoctor(" +
            "login: '" + data.dummyDoctor.login + "'," +
            "password: '" + data.dummyDoctor.password + "'," +
            "identityDocument: '" + data.dummyDoctor.identityDocument + updateSuffix + "'," +
            "register: " + (data.dummyDoctor.register + updateIncrement) + "," +
            "address: '" + data.dummyDoctor.address + updateSuffix + "'," +
            "gender: '" + data.dummyDoctor.gender + updateSuffix + "'," +
            "name: '" + data.dummyDoctor.name + updateSuffix + "'," +
            "phone: '" + data.dummyDoctor.phone + updateSuffix + "'," +
            "city: '" + data.dummyDoctor.city + updateSuffix + "'," +
            "state: '" + data.dummyDoctor.state + updateSuffix + "'," +
            "specialty: '" + data.dummyDoctor.specialty + updateSuffix + "'" +
        ") {" +
            "login," +
            "password," +
            "identityDocument," +
            "register," +
            "address," +
            "gender," +
            "name," +
            "phone," +
            "city," +
            "state," +
            "specialty" +
        "}" +
    "}";
exports.dummyDoctorDeleteQuery =
    "mutation { " +
        "removeDoctor(" +
        "login: '" + data.dummyDoctor.login + "'" +
    "){} }";

exports.dummyPatientCreateQuery =
    "query { " +
        "addPatient(" +
            "id: " + data.dummyPatient.id + "," +
            "name: '" + data.dummyPatient.name + "'," +
            "dob: '" + data.dummyPatient.dob + "'," +
            "gender: '" + data.dummyPatient.gender + "'," +
            "ethnicity: '" + data.dummyPatient.ethnicity + "'," +
            "civilStatus: '" + data.dummyPatient.civilStatus + "'," +
            "phone: '" + data.dummyPatient.phone + "'," +
            "address: '" + data.dummyPatient.address + "'," +
            "profession: '" + data.dummyPatient.profession + "'," +
            "naturalFrom: '" + data.dummyPatient.naturalFrom + "'," +
            "origin: '" + data.dummyPatient.origin + "'," +
            "referredBy: '" + data.dummyPatient.referredBy + "'," +
            "obs: '" + data.dummyPatient.obs + "'" +
        "){" +
            "id," +
            "name," +
            "dob," +
            "gender," +
            "ethnicity," +
            "civilStatus," +
            "phone," +
            "address," +
            "profession," +
            "naturalFrom," +
            "origin," +
            "referredBy," +
            "obs" +
        "} " +
    "}";
exports.dummyPatientReadQuery =
    "query { " +
        "patient(" +
            "name: '" + data.dummyPatient.name + "'" +
        "){" +
            "id," +
            "name," +
            "dob," +
            "gender," +
            "ethnicity," +
            "civilStatus," +
            "phone," +
            "address," +
            "profession," +
            "naturalFrom," +
            "origin," +
            "referredBy," +
            "obs" +
        "} " +
    "}";

exports.dummyPatientUpdateQuery =
    "query { " +
        "updatePatient(" +
            "id: " + data.dummyPatient.id + "," +
            "name: '" + data.dummyPatient.name + updateSuffix + "'," +
            "dob: '" + data.dummyPatient.dob + updateSuffix +"'," +
            "gender: '" + data.dummyPatient.gender + updateSuffix + "'," +
            "ethnicity: '" + data.dummyPatient.ethnicity + updateSuffix + "'," +
            "civilStatus: '" + data.dummyPatient.civilStatus + updateSuffix + "'," +
            "phone: '" + data.dummyPatient.phone + updateSuffix + "'," +
            "address: '" + data.dummyPatient.address + updateSuffix + "'," +
            "profession: '" + data.dummyPatient.profession + updateSuffix + "'," +
            "naturalFrom: '" + data.dummyPatient.naturalFrom + updateSuffix + "'," +
            "origin: '" + data.dummyPatient.origin + updateSuffix +"'," +
            "referredBy: '" + data.dummyPatient.referredBy + updateSuffix + "'," +
            "obs: '" + data.dummyPatient.obs + updateSuffix + "'" +
        "){" +
            "id," +
            "name," +
            "dob," +
            "gender," +
            "ethnicity," +
            "civilStatus," +
            "phone," +
            "address," +
            "profession," +
            "naturalFrom," +
            "origin," +
            "referredBy," +
            "obs" +
        "} " +
    "}";
exports.dummyPatientDeleteQuery =
    "mutation { " +
        "removePatient(" +
            "id: '" + data.dummyPatient.id + "'" +
    "){} }";

exports.dummyInsuranceProviderCreateQuery =
    "mutation " +
        "addInsuranceProvider(" +
            "name: '" + data.dummyInsuranceProvider.name + "', " +
            "amountCharged: " + data.dummyInsuranceProvider.amountCharged +
        "){" +
            "name," +
            "amountCharged" +
        "}" +
    "}";
exports.dummyInsuranceProviderReadQuery =
    "query { " +
        "insuranceProvider (" +
            "name: '" + data.dummyInsuranceProvider.name + "' " +
        "){" +
            "name," +
            "amountCharged" +
        "} " +
    "}";
exports.dummyInsuranceProviderUpdateQuery =
    "mutation { " +
        "updateInsuranceProvider(" +
            "name: '" + data.dummyInsuranceProvider.name + updateSuffix + "', " +
            "amountCharged: " + (data.dummyInsuranceProvider.amountCharged + updateIncrement) +
        "){" +
            "name," +
            "amountCharged" +
        "} " +
    "}";
exports.dummyInsuranceProviderDeleteQuery =
    "mutation { " +
        "removeInsuranceProvider(" +
            "name: '" + data.dummyInsuranceProvider.name + "'" +
        "){} }";

exports.dummyConsultationCreateQuery =
    "mutation {" +
        "addConsultation(" +
            "id: '" + data.dummyConsultation.id + "'," +
            "login: '" + data.dummyConsultation.login + "'," +
            "anamnesis: '" + data.dummyConsultation.anamnesis + "'," +
            "physical: '" + data.dummyConsultation.physical + "'," +
            "hypothesis: '" + data.dummyConsultation.hypothesis + "'," +
            "conduct: '" + data.dummyConsultation.conduct + "'," +
            "evolution: '" + data.dummyConsultation.evolution + "'," +
            "examination: '" + data.dummyConsultation.examination + "'," +
            "surgicalProcedures: '" + data.dummyConsultation.surgicalProcedures + "'" +
        "){" +
            "id," +
            "login," +
            "anamnesis," +
            "physical," +
            "hypothesis," +
            "conduct," +
            "evolution," +
            "examination," +
            "surgicalProcedures" +
        "}" +
    "}";
//TODO: review this
//No direct read for Consultation -> has to be gotten ONLY via Doctor type
exports.dummyConsultationReadQuery =
    "query { " +
        "doctor(" +
            "login: '" + data.dummyConsultation.login + "'" +
        "){" +
            "consultation (" +
                "name: '" + data.dummyPatient.name + "'" +
            "){" +
                "id," +
                "login," +
                "anamnesis," +
                "physical," +
                "hypothesis," +
                "conduct," +
                "evolution," +
                "examination," +
                "surgicalProcedures" +
            "}" +
        "} " +
    "}";
exports.dummyConsultationUpdateQuery =
    "mutation {" +
        "updateConsultation(" +
            "id: '" + data.dummyConsultation.id + "'," +
            "login: '" + data.dummyConsultation.login + "'," +
            "anamnesis: '" + data.dummyConsultation.anamnesis + "'," +
            "physical: '" + data.dummyConsultation.physical + "'," +
            "hypothesis: '" + data.dummyConsultation.hypothesis + "'," +
            "conduct: '" + data.dummyConsultation.conduct + "'," +
            "evolution: '" + data.dummyConsultation.evolution + "'," +
            "examination: '" + data.dummyConsultation.examination + "'," +
            "surgicalProcedures: '" + data.dummyConsultation.surgicalProcedures + "'" +
        "){" +
            "id," +
            "login," +
            "anamnesis," +
            "physical," +
            "hypothesis," +
            "conduct," +
            "evolution," +
            "examination," +
            "surgicalProcedures" +
        "}" +
    "}";
exports.dummyConsultationDeleteQuery =
    "mutation { " +
        "removeConsultation(" +
            "id: '" + data.dummyConsultation.id + "'" +
            "login: '" + data.dummyConsultation.login + "'" +
        "){} }";

exports.dummyDocTypeCreateQuery =
    "mutation {" +
        "addDocType(" +
            "login: '" + data.dummyDocType.login + "', " +
            "name: '" + data.dummyDocType.name + "', " +
            "content: '" + data.dummyDocType.content + "'" +
        "){" +
            "login," +
            "name," +
            "content" +
        "}" +
    "}";
//No direct read for DocType -> has to be gotten via Doctor type, to enforce authorization
exports.dummyDocTypeReadQuery =
    "query { " +
        "doctor(" +
            "login: '" + data.dummyDocType.login + "'" +
        "){" +
            "docType(" +
            "){" +
                "login," +
                "name," +
                "content" +
            "}" +
        "} " +
    "}";
exports.dummyDocTypeUpdateQuery =
    "mutation {" +
        "updateDocType(" +
            "login: '" + data.dummyDocType.login + "', " +
            "name: '" + data.dummyDocType.name + updateSuffix + "', " +
            "content: '" + data.dummyDocType.content + updateSuffix + "'" +
        "){" +
            "login," +
            "name," +
            "content" +
        "}" +
    "}";
exports.dummyDocTypeDeleteQuery =
    "mutation {" +
        "removeDocType(" +
            "login: '" + data.dummyDocType.login + "'," +
            "name: '" + data.dummyDocType.name + "'" +
    "){} }";

exports.dummyPaymentCreateQuery =
    "mutation {" +
        "addPayment(" +
            "id: " + data.dummyPayment.id + ", " +
            "login: '" + data.dummyPayment.login + "', " +
            "date: '" + data.dummyPayment.date + "' " +
        "){" +
            "id," +
            "login," +
            "date," +
            "insuranceProvider," +
            "amountCharged" +
        "}" +
    "}";
//No direct read for Payment -> has to be gotten via Patient or Doctor types, to enforce authorization
exports.dummyPaymentPatientReadQuery =
    "query { " +
        "patient(" +
            "id: " + data.dummyPayment.id + ", " +
            "login: '" + data.dummyPayment.login + "', " +
            "date: '" + data.dummyPayment.date + "' " +
        "){" +
            "payment(" +
                "id: " + data.dummyPayment.id + "', " +
                "login: '" + data.dummyPayment.login + "', " +
                "date: '" + data.dummyPayment.date + "'" +
            "){" +
                "id," +
                "login," +
                "date," +
                "insuranceProvider," +
                "amountCharged" +
            "}" +
        "} " +
    "}";
exports.dummyPaymentDoctorReadQuery =
    "query { " +
        "doctor(" +
            "id: " + data.dummyPayment.id + ", " +
            "login: '" + data.dummyPayment.login + "', " +
            "date: '" + data.dummyPayment.date + "' " +
        "){" +
            "payment(" +
                "id: " + data.dummyPayment.id + "', " +
                "login: '" + data.dummyPayment.login + "', " +
                "date: '" + data.dummyPayment.date + "'" +
            "){" +
                "id," +
                "login," +
                "date," +
                "insuranceProvider," +
                "amountCharged" +
            "}" +
        "} " +
    "}";
exports.dummyPaymentUpdateQuery =
    "mutation {" +
        "updatePayment(" +
            "id: " + data.dummyPayment.id + ", " +
            "login: '" + data.dummyPayment.login + "', " +
            "date: '" + data.dummyPayment.date + "' " +
            "insuranceProvider: '" + data.dummyPayment.insuranceProviderName + "', " +
            "amountCharged:" + (data.dummyPayment.amountCharged+updateIncrement) +
        "){" +
            "id," +
            "login," +
            "date," +
            "insuranceProvider," +
            "amountCharged" +
        "}" +
    "}";
exports.dummyPyamentDeleteQuery =
    "mutation { " +
        "removePayment(" +
            "id: '" + data.dummyPayment.id + "'," +
            "login: '" + data.dummyPayment.login + "'," +
            "date: '" + data.dummyPayment.date + "' " +
        "){} }";