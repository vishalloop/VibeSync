import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI){
    throw new Error("Error in connecting MONGO_URI");
}

if(!process.env.JWT_SECRET){
    throw new Error("Error in connecting JWT_SECRET");
}

if(!process.env.REDIS_HOST){
    throw new Error("Error in connecting REDIS_HOST");
}

if(!process.env.REDIS_PORT){
    throw new Error("Error in connecting REDIS_PORT");
}

if(!process.env.REDIS_PASSWORD){
    throw new Error("Error in connecting REDIS_PASSWORD");
}

const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    REDIS_HOST : process.env.REDIS_HOST,
    REDIS_PORT : process.env.REDIS_PORT,
    REDIS_PASSWORD : process.env.REDIS_PASSWORD
}

export default config;
