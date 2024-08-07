import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getUser, login, logout, signup } from "../controllers/user_controller.js";

const userRouter = Router();

userRouter.post('/auth/signup', signup);

userRouter.post('/auth/login', login);

userRouter.post('/auth/logout', isAuthenticated, logout)

userRouter.get('/auth/:email', getUser);

export default userRouter