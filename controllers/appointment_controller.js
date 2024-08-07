import { UserModel } from "../models/user_model.js";
import { appointmentValidator } from "../validators/appointment_validator.js";
import { AppointmentModel } from "../models/appointment_model.js";
import { mailTransport } from "../config/mail.js";

export const addAppointment = async (req, res, next) => {
  try {
    const { error, value } = appointmentValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Get user ID from session or request
    const id = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create the appointment
    const newAppointment = await AppointmentModel.create({
      ...value,
      user: id,
    });

    // Add the appointment to the user's appointments list
    user.appointments.push(newAppointment._id);
    await user.save();

    // Send email to user with appointment details
    await mailTransport.sendMail({
      from: "Health Care Support <fromMomo.com>",
      to: user.email, // Send email to the user's registered email
      subject: "Appointment Scheduled!",
      text: `Dear ${user.firstName} ${user.lastName},

A hospital appointment has been scheduled successfully with the following details:

Patient: ${value.patient}\n
Department: ${value.department}\n
Doctor: ${value.doctors}\n
Reason for Appointment: ${value.reasonForAppointment}\n
Appointment Date: ${value.appointmentDate.toDateString()}\n
Appointment Time: ${value.appointmentTime}\n
Status: ${newAppointment.status}\n
Relationship: ${value.relationship || 'N/A'}


Thank you!
Best regards,
Health Care Support Team`
    });

    // Return response
    res.status(201).json({
      message: "Appointment added successfully",
      appointments: newAppointment
    });
  } catch (error) {
    next(error);
  }
};



export const updateAppointment = async (req, res, next) => {
  try {
    const { error, value } = appointmentValidator.validate(req.body);
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
      return res.status(404).json({ message: "Appointment cannot be updated" });
    }

    // Send email to user with updated appointment details
    await mailTransport.sendMail({
      from: "Health Care Support <fromMomo.com>",
      to: user.email, // Send email to the user's registered email
      subject: "Appointment Updated!",
      text: `Dear ${user.firstName} ${user.lastName},

Your hospital appointment has been successfully updated with the following details:

Patient: ${editAppointment.patient}\n
Department: ${editAppointment.department}\n
Doctor: ${editAppointment.doctors}\n
Reason for Appointment: ${editAppointment.reasonForAppointment}\n
Appointment Date: ${editAppointment.appointmentDate.toDateString()}\n
Appointment Time: ${editAppointment.appointmentTime}\n
Status: ${editAppointment.status}\n
Relationship: ${editAppointment.relationship || 'N/A'}


If you did not request this change, please contact us immediately.

Thank you!

Best regards,
Health Care Support Team`
    });

    // Return response
    res.status(201).json({
      message: "Appointment updated successfully",
      appointments: editAppointment
    });
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
  
      const deletedAppointment = await AppointmentModel.findByIdAndDelete(req.params.id);
      if (!deletedAppointment) {
        return res.status(404).json({ message: "Appointment cannot be found" });
      }
  
      user.appointments.pull(req.params.id);
      await user.save();
  
      // Send email to user about the cancellation
      await mailTransport.sendMail({
        from: "Health Care Support <fromMomo.com>",
        to: user.email,
        subject: "Appointment Cancelled",
        text: `Dear ${user.firstName} ${user.lastName},
  
  Your hospital appointment has been successfully cancelled. Here are the details of the appointment that was cancelled:
  
  Patient: ${deletedAppointment.patient}\n
  Relationship: ${deletedAppointment.relationship || 'N/A'}\n
  Department: ${deletedAppointment.department}\n
  Doctor: ${deletedAppointment.doctors}\n
  Reason for Appointment: ${deletedAppointment.reasonForAppointment}\n
  Appointment Date: ${deletedAppointment.appointmentDate.toDateString()}\n
  Appointment Time: ${deletedAppointment.appointmentTime}
  
  If this was not done by you, please contact us immediately.
  
  Thank you!
  
  Best regards,
  Health Care Support Team`
      });
  
      res.status(200).json({ message: "Appointment has been deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  




export const getUserAppointment = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    const getAnAppointment = await AppointmentModel.findById(req.params.id);
    if (!getAnAppointment) {
      return res.status(404).json({ message: "No appointment found" });
    }
    res.status(200).json({ message: "This is your appointment", appointments: getAnAppointment });
  } catch (error) {
    next(error);
  }
};


export const getAllUserAppointments = async (req, res, next) => {
  try {
    const id = req.session?.user?.id || req?.user?.id;
    const getAllAppointments = await AppointmentModel.find({ user: id });
    if (!getAllAppointments) {
      return res.status(404).json({ message: "No appointments found" });
    }
    res.status(200).json({ message: "These are all your appointments", appointments: getAllAppointments });
  } catch (error) {
    next(error);
  }
};



// export const addAppointment = async (req, res, next) => {
//     try {
//       const { error, value } = appointmentValidator.validate(req.body);
//       if (error) {
//         return res.status(400).send(error.details[0].message);
//       }
//       //Get user id from session or request
//       const id = req.session?.user?.id || req?.user?.id;
//       const user = await UserModel.findById(id);
//       if (!user) {
//         return res.status(404).send("User not found");
//       }
  
//       const newAppointment = await AppointmentModel.create({
//         ...value,
//         user: id,
//       });
  
//       user.appointments.push(newAppointment._id);
//       await user.save();
//    // Send email to user
//    await mailTransport.sendMail({
//     from: "Health Care Support <fromMomo.com>",
//     to: value.email,
//     subject: "Appointment Scheduled!",
//     text: `Dear user,\n\nA A hospital appointment has been scheduled successfully with the following details.\n\nfullName: ${value.fullname}\n\Department: ${value.department}\n\nDoctor: ${value.doctors}\n\nAppointment Date: ${value.appointmentDate}\n\nPatient: ${value.patient || 'user'}\n\nThank you!`,
//   });
//       res.status(201).json({message:" Apointment added successfully", newAppointment});
//     } catch (error) {
//       next(error);
//     }
//   };
