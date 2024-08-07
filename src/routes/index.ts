import express from "express";
import UserModel from "../db/schema/userSchema";
import authRouter from "./auth";
import { failureHandler, successHandler } from "../utils/successHandler";
import notFoundController from "../controller/notFoundController";

const app = express.Router();

app.use("/auth", authRouter);

app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    successHandler(res, users);
  } catch (error) {
    console.log("Error: ", error);
    failureHandler(res, "Something went wrong. Please try again later");
  }
});

app.use(notFoundController);

export default app;
