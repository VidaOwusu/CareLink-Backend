import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addAppointment, deleteAppointment, getAllUserAppointments, getUserAppointment, updateAppointment } from "../controllers/appointment_controller.js";

const appointmentRouter = Router();

appointmentRouter.post('/api/v1/appointment', isAuthenticated, addAppointment);

appointmentRouter.patch('/api/v1/appointment/:id', isAuthenticated,updateAppointment);

appointmentRouter.get('/api/v1/appointment/:id',isAuthenticated, getUserAppointment);

appointmentRouter.delete('/api/v1/appointment/:id',isAuthenticated, deleteAppointment);

appointmentRouter.get('/api/v1/appointment',isAuthenticated, getAllUserAppointments);

export default appointmentRouter;