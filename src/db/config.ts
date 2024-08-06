import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectionString = process.env["MONGO_URI"] ?? "";

const mongoConnectionPromise = mongoose
  .connect(connectionString)
  .then((m) => m.connection.getClient());

export default mongoConnectionPromise;
