import Joi from "joi"

export const profileValidator = Joi.object({
    
    fullName:Joi.string(),
    sex: Joi.string(),
    dateOfBirth: Joi.date(),
    occupation: Joi.string(),
    address: Joi.string(),
    emergencyContactName: Joi.string(),
    emergencyContactNumber: Joi.string(),
    pastMedicalHistory: Joi.string(),
    familyMedicalHistory: Joi.string(),
    allergies: Joi.string(),
    currentMedications: Joi.string(),
    identificationType: Joi.string(),
    identificationNumber: Joi.string(),
    insuranceProvider: Joi.string(),
    insurancePolicyNumber:Joi.string(),
    identificationDocument: Joi.string(),
    user: Joi.string()
}
);