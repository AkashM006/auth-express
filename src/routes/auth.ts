import express from "express";
import { registerController } from "../controller/authController";
import validator from "../utils/middlewares/validatorMiddleware";
import registerRequestBodySchema from "../validators/auth/registerValidationSchema";
import passport from "passport";
import { successHandler } from "../utils/successHandler";
import loginRequestBodySchema from "../validators/auth/loginValidationSchema";

const app = express.Router();

app.post("/register", validator(registerRequestBodySchema), registerController);

app.post(
  "/login",
  validator(loginRequestBodySchema),
  passport.authenticate("local", { failureRedirect: "/nothing" }),
  (req, res) => {
    successHandler(res, "Success");
  }
);

export default app;
