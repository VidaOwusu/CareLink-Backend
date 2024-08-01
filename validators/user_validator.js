import Joi from "joi";

export const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});


export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string(),
    
});

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
    user: Joi.string()
}
);

export const appointmentValidator = Joi.object({
    
    patient:Joi.string().required(),
    department: Joi.string().required(),
    doctors: Joi.string().required(),
    reasonForAppointment: Joi.string().required(),
    appointmentDate:Joi.date().required(),
    user: Joi.string()
    
}
);