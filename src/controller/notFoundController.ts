import { Request, Response } from "express";
import { failureHandler } from "../utils/successHandler";

const notFoundController = (req: Request, res: Response) => {
  return failureHandler(
    res,
    `The route ${req.originalUrl} was not found in the server`,
    404
  );
};

export default notFoundController;
