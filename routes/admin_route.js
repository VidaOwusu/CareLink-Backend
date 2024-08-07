import express from 'express';
import { Router } from 'express';
import { getDoctors, getAppointments, getUsers, createUser, updateUser, deleteUser, setupAdmin } from '../controllers/admin_controller.js';
import { isAuthenticated, isAdmin } from '../middlewares/auth.js';


const adminRouter = Router();
adminRouter.get('/admin/doctors', isAuthenticated, isAdmin, getDoctors);
adminRouter.get('/admin', isAuthenticated, isAdmin, getAppointments);
adminRouter.post('/admin/users',isAuthenticated, isAdmin, createUser);

// adminRouter.get('/api/v1/admin/users', isAuthenticated, isAdmin, getUsers);
// adminRouter.patch('/api/v1/admin/users', isAuthenticated, isAdmin, updateUser);
// adminRouter.delete('/api/v1/admin/users', deleteUser)
// adminRouter.post('/api/v1/setup-admin', setupAdmin);

export default adminRouter;


