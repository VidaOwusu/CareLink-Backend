import { model, Schema , Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const appointmentSchema = new Schema({
        patient: {type:String, enum: ["personal", "someone else"], required: true},
        department: {type:String, enum: ["General Practice", "Dentistry", "Cardiology", "Obstetrics and Gynecology", "Orthopedics", "Infectious Diseases", "Dermatology", "Pediatrics", "Ophthalmology"], required: true},
        doctors: {type: String, enum:[
                "Dr. John Smith",
                "Dr. Emily Johnson",
                 "Dr. Sarah Davis",
                "Dr. David Wilson",
                "Dr. James Taylor",
                "Dr. Jessica Anderson",
                 "Dr. Robert Thomas",
                 "Dr. Elizabeth Lee",
                "Dr. William Harris",
                 "Dr. Karen Clark, "   
        ], required: true} ,
        reasonForappointment: {type: String, required: true},
        appointmentDate: {type: Date, required: true},
        user: { type: Types.ObjectId, ref: "User" }
    },{
        timestamps:true
    })

    appointmentSchema.plugin(toJSON);
    export const AppointmentModel = model("Appointment", appointmentSchema)