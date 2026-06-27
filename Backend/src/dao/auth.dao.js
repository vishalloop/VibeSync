import userModel from "../models/user.model.js"

export const checkUser = async (email) => {
    const isUserExists = await userModel.findOne({email});

    return isUserExists;
}

export const registerUser = async (name, email, password) => {

    const user = await userModel.create({
        name, email, password
    })

    return user;
}