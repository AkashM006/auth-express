import { Request, Response } from "express";
import { successHandler } from "../utils/successHandler";

const registerController = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  successHandler(res, "Successfully created user");
};

export { registerController };
