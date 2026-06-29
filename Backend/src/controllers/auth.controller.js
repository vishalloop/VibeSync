import jwt from "jsonwebtoken"
import config from "../config/config.js"
import { checkUser, localRegisterUser, googleRegisterUser ,setToken } from "../dao/auth.dao.js"


const generateToken = (user, res, message) => {
    const token = jwt.sign({
        id : user._id,
    }, config.JWT_SECRET,{expiresIn : "7d"});

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message : message,
        success : true,
        user : {
            name : user.name,
            email : user.email
        }
    })
}

export const registerController = async (req, res, next) => {
    const {name, email, password} = req.body;

    const isUserExists = await checkUser(email, null, null);

    if(isUserExists) {
        const error = new Error("User already exists with this email address.");
        error.statusCode = 422;
        return next(error);
    }

    if (!password) {
        const error = new Error("Password is required for local signup.");
        error.statusCode = 400;
        return next(error);
    }

    const user = await localRegisterUser(name, email, password);

    generateToken(user, res, "User Registered SuccessFully.");
}

export const loginController = async (req, res, next) => {
    const {email, password} = req.body;

    const isUserExists = await checkUser(email, null, null);

    if(!isUserExists) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        return next(error);
    }

    if (isUserExists.authProvider === "google") {
        const error = new Error("Please Continue with google.");
        error.statusCode = 401;
        return next(error);
    }

    const isMatch = await isUserExists.comparePassword(password);

    if(!isMatch){
        const error = new Error("Invalid Email or Password");
        error.statusCode = 401;
        return next(error);
    }

    generateToken(isUserExists, res, "User Logged In SuccessFully.");
}

export const logoutController = async (req, res, next) => {
    const token = req.cookies.token;

    res.clearCookie("token");

    await setToken(token);

    res.status(201).json({
        message : "User logout SuccessFull."
    })

}

export const getMeController = async (req, res, next) => {
    const user = req.user;

    res.status(200).json({
        message : "User Fetched SuccessFully",
        success : true,
        user : {
            id : user._id,
            name : user.name,
            email : user.email
        }
    })
}

export const googleAuthCallback = async (req, res, next) => {

    const googleId = req.user.id;
    const name = req.user.displayName;
    const email = req.user?.emails?.[0];

    if(!email?.value || !email?.verified){
        const error = new Error("User Email address not found or it is not verified.");
        error.statusCode = 404;
        return next(error);
    };

    let user = await checkUser(email.value, null, googleId);

    if (!user) {
        user = await googleRegisterUser(name, email.value, 'google', googleId);
    };

    const token = jwt.sign({
        id : user._id,
    }, config.JWT_SECRET,{expiresIn : "7d"});

    res.cookie("token", token, {
        httpOnly: true,
        secure: config.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect("http://localhost:5173/");
}