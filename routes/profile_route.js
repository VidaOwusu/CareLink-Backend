import { Router } from "express";
import { addProfile, updateProfile } from "../controllers/profile_controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const profileRouter = Router();

profileRouter.post('/api/v1/profile',isAuthenticated, addProfile);

profileRouter.patch('/api/v1/profile/:id',isAuthenticated, updateProfile);

export default profileRouter;