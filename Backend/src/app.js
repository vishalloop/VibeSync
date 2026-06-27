import express from "express"
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middlware.js";
import cookieParser from "cookie-parser"
import morgan from "morgan"
import passport from "./services/gmail.service.js"

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth",authRouter);


app.get("/",(req,res)=>{
    res.send("hello from vishal")
})

app.use(errorHandler);
export default app;