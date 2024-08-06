import express from "express";
import dotenv from "dotenv";
import appRouter from "./routes/index";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import mongoConnectionPromise from "./db/config";

dotenv.config();

const port = process.env["PORT"];

const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: mongoConnectionPromise,
      dbName: "app",
      autoRemoveInterval: 10,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    },
  })
);

app.use(appRouter);

app.listen(port ?? 3000, () => {
  console.log(`Server is running on port: ${port}`);
});
