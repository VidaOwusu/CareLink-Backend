import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getUser, getUsers, login, logout, signup } from "../controllers/user_controller.js";

const userRouter = Router();

userRouter.post('/api/v1/auth/signup', signup);

userRouter.post('/api/v1/auth/login', login);

userRouter.post('/api/v1/auth/logout', isAuthenticated, logout)

userRouter.get('/api/v1/users', isAuthenticated, getUsers);

userRouter.get('/api/v1/users/auth/:email', getUser);

export default userRouter