import { Router } from "express";
import { addProfile, getUserProfile, updateProfile } from "../controllers/profile_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/upload.js";

const profileRouter = Router();

profileRouter.post('/profile', remoteUpload.single('identificationDocument'), addProfile);

profileRouter.patch('/profile/:id',isAuthenticated, remoteUpload.single('identificationDocument'), updateProfile);

profileRouter.get('/profile', isAuthenticated, getUserProfile)

export default profileRouter;