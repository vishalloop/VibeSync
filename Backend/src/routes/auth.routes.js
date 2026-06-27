import express from "express"
import {registerValidation, loginValidation}  from "../validators/auth.validator.js"
import {registerController, loginController, logoutController, getMeController} from "../controllers/auth.controller.js";
import identifyUser from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register",registerValidation,registerController);
authRouter.post("/login",loginValidation,loginController);
authRouter.post("/logout",identifyUser,logoutController);
authRouter.get("/get-me",identifyUser, getMeController);

export default authRouter;