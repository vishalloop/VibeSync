import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"
import { checkUser, registerUser, setToken } from "../dao/auth.dao.js"


const generateToken = (user, res, message) => {
    const token = jwt.sign({
        id : user._id,
    }, config.JWT_SECRET,{expiresIn : "7d"});

    res.cookie("token", token);

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

    const isUserExists = await checkUser(email, null);

    if(isUserExists) {
        const error = new Error("User already exists with this email address.");
        error.statusCode = 422;
        return next(error);
    }

    const user = await registerUser(name, email, password);

    generateToken(user, res, "User Registered SuccessFully.");
}

export const loginController = async (req, res, next) => {
    const {email, password} = req.body;

    const isUserExists = await checkUser(email, null);

    if(!isUserExists) {
        const error = new Error("Invalid email or password");
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