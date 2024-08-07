import { model, Schema , Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const appointmentSchema = new Schema({
        patient: {type:String, enum: ["personal", "someone else"], required: true},
        relationship: {type:String},
        department: {type:String, enum: ["General", "Dental", "Cardiology", "Obstetrics and Gynecology","Neurology", "Emergency", "Pediatrics", "Ophthalmology"], required: true},
        doctors: {type: String, enum:[
                "Dr. Brown Spencer",
                "Dr. Michael Brown",
                 "Dr. Sarah Henandez",
                "Dr. Richard Lewis",
                "Dr. Anthony Harris",
                "Dr. Rachel King",
                 "Dr. Edward Young",
                 "Dr. Sarah Mitchell",
                "Dr. Gregory Parker",
                 "Dr. Victoria Hill" ,
                 "Dr. Angela Cooper",
                 "Dr. Thomas Carter" ,
                 "Dr. Michael Turner",
                 "Dr. Stephanie Collins",
                 "Dr. Daniel Harris"
        ], required: true} ,
        reasonForAppointment: {type: String, required: true},
        appointmentDate: {type: Date, required: true},
        status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
        user: { type: Types.ObjectId, ref: "User" }
    },{
        timestamps:true
    })

    appointmentSchema.plugin(toJSON);
    export const AppointmentModel = model("Appointment", appointmentSchema)