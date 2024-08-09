import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  verifyCode,
} from "../controllers/resetPassword_controller.js";

export const passwordRouter = Router();

passwordRouter.post("/password/recover", forgotPassword);

passwordRouter.post("/password/verify-code", verifyCode);

passwordRouter.post("/password/change", resetPassword);
