/**
 * Importing all the neccessary packages
 */
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import userRouter from "./router/user.route.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
dbConnection();
app.use("/user", userRouter);

/**
 * Exporting App
 */
module.exports = app;
