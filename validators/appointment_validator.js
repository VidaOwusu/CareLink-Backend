import Joi from "joi"

export const appointmentValidator = Joi.object({
    
    patient:Joi.string(),
    department: Joi.string(),
    doctors: Joi.string(),
    reasonForAppointment: Joi.string(),
    appointmentDate:Joi.date()
    
}
);