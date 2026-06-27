import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("Error in connecting MONGO_URI");
}

if(!process.env.JWT_SECRET){
    throw new Error("Error in connecting JWT_SECRET");
}

const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
}

export default config;
