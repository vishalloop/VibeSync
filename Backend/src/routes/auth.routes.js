import express from "express"
import {registerValidation, loginValidation}  from "../validators/auth.validator.js"
import {registerController, loginController, logoutController, getMeController, googleAuthCallback} from "../controllers/auth.controller.js";
import identifyUser from "../middleware/auth.middleware.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/register",registerValidation,registerController);
authRouter.post("/login",loginValidation,loginController);
authRouter.post("/logout",identifyUser,logoutController);
authRouter.get("/get-me",identifyUser, getMeController);

authRouter.get("/google",
    passport.authenticate("google", {scope: ["profile", "email"]})
)

authRouter.get("/google/callback", 
    passport.authenticate('google',{ session : false, failureRedirect : '/'}),
    googleAuthCallback
)

export default authRouter;