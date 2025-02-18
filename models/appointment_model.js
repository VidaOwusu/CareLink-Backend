import { model, Schema , Types} from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const appointmentSchema = new Schema({
    
        patient: {type:String, enum: ["personal", "someone else"], required: true},

        relationship: {type:String},

        department: {type:String, enum: ["General", "Dental", "Cardiology", 
        "Obstetrics and Gynecology","Neurology", "Emergency", "Pediatrics", 
        "Ophthalmology"], required: true},

        doctors: {type: String, enum:[
           " Dr Yaw Sekyi",
            "Dr Micheal Brown",
           " Dr Ruth Snow",
           " Dr. Richard Lewis",
            "Dr Anthony Spencer",
            "Dr Vidash Daizey",
            "Dr Sarah Mitchell",
            "Dr Daniel Sidsaya",
            "Dr Victoria Hill",
            "Dr Lisa Foster",
            "Dr Thomas Carter",
            "Dr Stephanie Collins"
        ], required: true} ,
        reasonForAppointment: {type: String, required: true},
        appointmentDate: {type: Date, required: true},
        appointmentTime: {type: String, required: true},
        status: { type: String, enum: ["scheduled", "completed", "cancelled", "pending"], default: "scheduled" },
        user: { type: Types.ObjectId, ref: "User" }
    },{
        timestamps:true
    })

    appointmentSchema.plugin(toJSON);
    export const AppointmentModel = model("Appointment", appointmentSchema)