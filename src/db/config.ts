import dotenv from "dotenv";

dotenv.config();

const mongoUser = process.env["MONGO_USER"] ?? "";
const mongoPassword = process.env["MONGO_PASSWORD"] ?? "";
const mongoHost = process.env["MONGO_HOST"] ?? "";
const mongoDb = process.env["MONGO_DB"] ?? "";

const connectionString = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDb}?retryWrites=true&w=majority&appName=DevCluster0`;

export default connectionString;
