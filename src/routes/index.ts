import express from "express";
import UserModel from "../db/schema/users";

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({
      status: "Success",
      msg: users,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.json({
      status: "Failed",
      msg: "Something went wrong. Please try again later",
    });
  }
});

export default app;
