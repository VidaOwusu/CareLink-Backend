import { model,  Schema } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";


const userSchema = new Schema({
    firstName: {type:String, required:true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required:true},
    password: {type: String, required: true},
    phoneNumber: {type:String, required:true}
}, {
    timestamps: true
})

userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);