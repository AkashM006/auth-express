import { Request, Response } from "express";

const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, name, password } = req.body;

  try {
  } catch (error) {}
};

export { registerController };
