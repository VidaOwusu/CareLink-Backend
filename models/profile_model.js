import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const profileSchema = new Schema({
    fullName: {type:String},
    dateOfBirth: {type: String},
    sex: {type:String, enum: ["male", "female"]},
    address: {type: String},
    occupation: {type: String},
    emergencyContactName: {type: String, required: true},
    emergencyContactNumber: {type: String, required: true},
    pastMedicalHistory: {type: String},
    familyMedicalHistory: {type: String},
    allergies: {type: String},
    currentMedications: {type:String},
    identificationType: {type: String, enum: ["Birth Certificate", "Ghana Card"]},
    identificationNumber: {type:String},
    user: { type: Types.ObjectId, ref: "User" }
}, {
    timestamps:true
});

profileSchema.plugin(toJSON)

export const ProfileModel = model("Profile", profileSchema)