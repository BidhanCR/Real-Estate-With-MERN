import express from "express";
import { google, signIn, signOut, signup } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/sign-in", signIn);
authRouter.post("/google", google);
authRouter.get("/sign-out", signOut);


export default authRouter;