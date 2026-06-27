import express from "express"
import {registerValidation, loginValidation}  from "../validators/auth.validator.js"
import {registerController, loginController} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register",registerValidation,registerController);
authRouter.post("/login",loginValidation,loginController);

export default authRouter;