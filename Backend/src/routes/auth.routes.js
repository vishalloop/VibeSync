import express from "express"
import {registerValidation, loginValidation}  from "../validators/auth.validator.js"
import {registerController, loginController, logoutController, getMeController, googleAuthCallback} from "../controllers/auth.controller.js";
import identifyUser from "../middleware/auth.middleware.js";
import passport from "passport";
import config from "../config/config.js";

const authRouter = express.Router();

authRouter.post("/register",registerValidation,registerController);
authRouter.post("/login",loginValidation,loginController);
authRouter.post("/logout",identifyUser,logoutController);
authRouter.get("/get-me",identifyUser, getMeController);

authRouter.get("/google",
    passport.authenticate("google", {scope: ["profile", "email"]})
)

authRouter.get("/google/callback", 
    passport.authenticate('google',{ 
        session : false, 
        failureRedirect : config.NODE_ENV == "development" ? "http://localhost:5173/login" : "/login"
    }),
    googleAuthCallback
)

export default authRouter;