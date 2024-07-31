import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getUser, getUsers, login, logout, signup } from "../controllers/user_controller.js";

const userRouter = Router();

userRouter.post('/api/auth/signup', signup);

userRouter.post('/api/auth/login', login);

userRouter.post('/api/auth/logout', isAuthenticated, logout)

userRouter.get('/api', isAuthenticated, getUsers);

userRouter.get('/api/auth/:email', getUser);

export default userRouter