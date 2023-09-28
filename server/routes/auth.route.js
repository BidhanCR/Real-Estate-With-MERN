import express from "express";
import { signIn, signup } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/sign-in", signIn);


export default authRouter;