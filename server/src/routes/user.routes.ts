import { Router } from "express";
import { loginUser, registerUser, forgotPassword } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);

export default userRouter;
