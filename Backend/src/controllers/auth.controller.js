import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

export const registerController = async (req, res, next) => {
    const {name, email, password} = req.body;

    const isUserExists = await userModel.findOne({email});

    if(isUserExists) {
        const error = new Error("User already exists with this email address.");
        error.statusCode = 422;
        return next(error);
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign({
        id : user._id,
    },config.JWT_SECRET,{expiresIn : "7d"});

    res.cookie("token", token);

    return res.status(201).json({
        message : "User Registered Successfull",
        success : true,
        user : {
            name : user.name, 
            email : user.email
        }
    })
}
