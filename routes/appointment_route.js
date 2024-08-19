import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addAppointment, deleteAppointment, getAllUserAppointments, getUserAppointment, updateAppointment } from "../controllers/appointment_controller.js";

const appointmentRouter = Router();

appointmentRouter.post('/appointment', addAppointment);

appointmentRouter.patch('/appointment/:id', isAuthenticated,updateAppointment);

appointmentRouter.get('/appointment/:id',isAuthenticated, getUserAppointment);

appointmentRouter.delete('/appointment/:id',isAuthenticated, deleteAppointment);

appointmentRouter.get('/appointment',isAuthenticated, getAllUserAppointments);

export default appointmentRouter;