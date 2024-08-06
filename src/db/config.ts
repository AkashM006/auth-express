import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env["MONGO_URI"] ?? "";

export default connectionString;
