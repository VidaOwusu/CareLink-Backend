import express from 'express';
import { Router } from 'express';
import { getDoctors, getAppointments } from '../controllers/admin_controller.js';
import { isAuthenticated, isAdmin } from '../middlewares/auth.js';


const adminRouter = Router();

adminRouter.get('/doctors', isAuthenticated, isAdmin, getDoctors);
adminRouter.get('/appointments', isAuthenticated, isAdmin, getAppointments);

export default adminRouter;
