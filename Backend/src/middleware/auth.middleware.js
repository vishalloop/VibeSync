import jwt from "jsonwebtoken"
import config from "../config/config.js";
import { checkUser , getToken} from "../dao/auth.dao.js";

const identifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        const error = new Error("Invalid token.")
        error.statusCode = 401;
        return next(error);
    }

    const isTokenBlackListed = await getToken(token);

    if(isTokenBlackListed) {
        const error = new Error("Unauthorized Access1");
        error.statusCode = 401;
        return next(error);
    }

    try{
        const decoded = jwt.verify(token, config.JWT_SECRET);
        
        const user = await checkUser(null, decoded.id, null);

        if(!user) {
            const error = new Error("Unauthorized2");
            error.statusCode = 401;
            return next(error);
        }

        req.user = user;
        next();

    } catch(err){
        console.log(err);
        const error = new Error("Unauthorized3");
        error.statusCode = 401;
        return next(error);
    }
}

export default identifyUser;