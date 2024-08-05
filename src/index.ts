import express from "express";
import dotenv from "dotenv";
import appRouter from "./routes/index";
import mongoose from "mongoose";
import connectionString from "./db/config";

dotenv.config();

const port = process.env["PORT"];

const app = express();
app.use(express.json());

app.use(appRouter);

app.listen(port ?? 3000, async () => {
  try {
    await mongoose.connect(connectionString);
    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.log("Error when starting the server: ", error);
  }
});
