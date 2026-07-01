import express from "express"
import authRouter from "./routes/auth.routes.js";
import youtubeRouter from "./routes/youtube.routes.js";
import errorHandler from "./middleware/error.middlware.js";
import cookieParser from "cookie-parser"
import morgan from "morgan"
import passport from "./services/gmail.service.js"
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth",authRouter);
app.use("/api/youtube", youtubeRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.join(__dirname, "../../Frontend/dist");

app.use(express.static(frontendDistPath));

app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
});

app.use(errorHandler);
export default app;