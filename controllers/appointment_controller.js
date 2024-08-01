import { UserModel } from "../models/user_model.js";
import { appointmentValidator } from "../validators/appointment_validator.js";
import { AppointmentModel } from "../models/appointment_model.js";

export const addAppointment = async (req, res, next) => {
    try {
      const { error, value } = appointmentValidator.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
      //Get user id from session or request
      const id = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const newAppointment = await AppointmentModel.create({
        ...value,
        user: id,
      });
  
      user.appointments.push(newAppointment._id);
    //   user.achievements.push(achievement._id)
  
      await user.save();
  
      res.status(201).json({message:" Apointment added successfully", newAppointment});
    } catch (error) {
      next(error);
    }
  };

  export const updateAppointment = async (req, res, next) => {
    try {
      const { error, value } = appointmentValidator.validate(req.body,);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }
  
      const id = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const editAppointment = await AppointmentModel.findByIdAndUpdate(
        req.params.id,
        value,
        { new: true }
      );
      if (!editAppointment) {
        return res.status(404).json({message: "Appointment cannot be updated" });
      }
  
      res.status(201).json({message:"Appointment updated successfully", editAppointment} );
    } catch (error) {
      next(error);
    }
  };
  

  export const deleteAppointment = async (req, res, next) => {
    try {
      const id = req.session?.user?.id || req?.user?.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const deletedAppointment = await AppointmentModel.findByIdAndDelete(
        req.params.id
      );
      if (!deletedAppointment) {
        return res.status(404).json({message: "Appointment cannot be found"})
      }
  
      user.appointments.pull(req.params.id);
      await user.save();
      res.status(200).json({message: "Appointment have ben deleted successfully"});
    } catch (error) {
      next(error);
    }
  };
  
  export const getUserAppointment = async (req, res, next)=>{
   try {
    const id = req.session?.user?.id || req?.user?.id;
      const getAnAppointment = await AppointmentModel.findById(req.params.id);
      if (!getAnAppointment) {
        return res.status(404).json({ message: "No appointment found" });
      }
      res.status(200).json({ message: "These is  your appointment", getUserAppointment });
   }
   catch (error) {
    next(error)
   }}

   export const getAllUserAppointments = async (req, res, next) => {
    try {
      // Fetching Appointment that belongs to a particular user
      const id = req.session?.user?.id || req?.user?.id;
      const getAllAppointments = await AppointmentModel.find({ user: id });
      if (!getAllAppointments) {
        return res.status(404).json({ message: "No appointments found" });
      }
      res.status(200).json({ message: "These are all your appointments", getAllAppointments });
    } catch (error) {
      next(error);
    }
  };