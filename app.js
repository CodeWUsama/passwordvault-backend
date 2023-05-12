import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import userRouter from "./routes/users.js";
import generalRouter from "./routes/general.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", generalRouter);
app.use("/user", userRouter);

export default app;
