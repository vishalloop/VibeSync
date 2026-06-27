import express from "express"
import authRouter from "./routes/auth.routes";
import errorHandler from "./middleware/error.middlware";

const app = express();

app.use("/api/auth",authRouter);

app.use(errorHandler);

export default app;