import dotenv from "dotenv";
dotenv.config();

const getEnv = (key) => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`${key} is missing`);
    }

    return value;
};

const config = {
    NODE_ENV : getEnv("NODE_ENV"),
    MONGO_URI: getEnv("MONGO_URI"),
    JWT_SECRET: getEnv("JWT_SECRET"),
    REDIS_HOST: getEnv("REDIS_HOST"),
    REDIS_PORT: getEnv("REDIS_PORT"),
    REDIS_PASSWORD: getEnv("REDIS_PASSWORD"),
    GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
    GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL"),
    FRONTEND_URL : getEnv("FRONTEND_URL"),
};

export default config;
