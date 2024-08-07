import passport from "passport";
import PassportLocal from "passport-local";
import UserModel from "../../db/schema/userSchema";
import { verifyHash } from "../password";

console.log("Loaded");

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
  console.log("Verify callback");
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      console.log("no user");
      return done(null, false);
    }
    const isValidPassword = await verifyHash(password, user.hash);
    if (!isValidPassword) {
      console.log("Here");
      return done(null, false);
    }
    console.log("Done");
    return done(null, user);
  } catch (err) {
    console.log("Error: ", err);
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
