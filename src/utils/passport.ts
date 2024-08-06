import passport from "passport";
import PassportLocal from "passport-local";
import UserModel from "../db/schema/userSchema";
import { verifyHash } from "./password";

type User = {
  _id?: number;
};
const customFields = {
  userNameField: "email",
  passwordField: "password",
};

const verifyCallback: PassportLocal.VerifyFunction = async (
  username,
  password,
  done
) => {
  try {
    const user = await UserModel.findOne({ username });
    if (!user) return done(null, false);

    if (!verifyHash(password, user.hash!)) return done(null, false);

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const localStrategy = new PassportLocal.Strategy(customFields, verifyCallback);

passport.use(localStrategy);

passport.serializeUser((user: User, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await UserModel.findById(userId);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
