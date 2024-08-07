import { Request, Response } from "express";
import { failureHandler, successHandler } from "../utils/successHandler";
import { RegisterRequestBodySchema } from "../validators/auth/registerValidationSchema";
import { generateHash } from "../utils/password";
import UserModel from "../db/schema/userSchema";
import { log } from "../utils/logger";

const registerController = async (
  req: Request<{}, {}, RegisterRequestBodySchema>,
  res: Response
) => {
  const { email, name, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      email,
    });

    if (existingUser)
      return failureHandler(res, "Email Id already exists. Try a new one!");

    const hash = await generateHash(password);

    const user = new UserModel({
      email,
      name,
      hash,
    });
    await user.save();
  } catch (error) {
    log("Something went wrong: ", error);
    return failureHandler(
      res,
      "Something went wrong when trying to create user. Please try again later!"
    );
  }

  successHandler(res, "Successfully created user");
};

export { registerController };
