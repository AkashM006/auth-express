import express from "express";
import dotenv from "dotenv";
import appRouter from "./routes/index";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import mongoConnectionPromise from "./db/config";

dotenv.config();

const port = process.env["PORT"];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "",
    resave: false,
    saveUninitialized: true,
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

import "./utils/middlewares/passport";

app.use(passport.initialize());
app.use(passport.session());

app.use(appRouter);

app.listen(port ?? 3000, () => {
  console.log(`Server is running on port: ${port}`);
});
