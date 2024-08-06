import express from "express";
import { registerController } from "../controller/authController";

const app = express.Router();

app.post("/register", registerController);

export default app;
