import { AppointmentModel } from '../models/appointment_model.js';

export const getDoctors = async (req, res, next) => {
  try {
    const doctors = [
      "Dr. John Smith",
      "Dr. Emily Johnson",
      "Dr. Sarah Davis",
      "Dr. David Wilson",
      "Dr. James Taylor",
      "Dr. Jessica Anderson",
      "Dr. Robert Thomas",
      "Dr. Elizabeth Lee",
      "Dr. William Harris",
      "Dr. Karen Clark",
    ];
    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await AppointmentModel.find().populate('user');
    res.status(200).json(appointments);
  } catch (error) {
    next(error);
  }
};
