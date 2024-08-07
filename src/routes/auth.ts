import express from "express";
import { registerController } from "../controller/authController";
import validator from "../utils/validatorMiddleware";
import registerRequestSchema from "../validators/registerValidator";

const app = express.Router();

app.post("/register", validator(registerRequestSchema), registerController);

export default app;
