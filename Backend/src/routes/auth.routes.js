import express from "express"
import {registerValidation}  from "../validators/auth.validator.js"
import {registerController} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register",registerValidation,registerController);

export default authRouter;