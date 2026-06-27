import userModel from "../models/user.model.js"
import redis from "../config/redis.js";

export const checkUser = async (email, id) => {
    const orConditions = [];

    if(email) orConditions.push({email});
    if(id) orConditions.push({_id : id}); 

    if(orConditions.length ===  0) return null;

    const isUserExists = await userModel.findOne({$or : orConditions });

    return isUserExists;
}

export const registerUser = async (name, email, password) => {

    const user = await userModel.create({
        name, email, password
    })

    return user;
}

export const setToken = async (token) => {
    await redis.set(token, Date.now().toString(), "Ex", 60*60*24*7);
}

export const getToken = async (token) => {
   const isTokenBackListed = await redis.get(token);

   return isTokenBackListed;
}