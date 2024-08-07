import { Router } from "express";
import { addProfile, getUserProfile, updateProfile } from "../controllers/profile_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";

const profileRouter = Router();

profileRouter.post('/api/v1/profile',isAuthenticated, remoteUpload.single('identificationDocument'), addProfile);

profileRouter.patch('/api/v1/profile/:id',isAuthenticated, remoteUpload.single('identificationDocument'), updateProfile);

profileRouter.get('/api/v1/profile', isAuthenticated, getUserProfile)

export default profileRouter;