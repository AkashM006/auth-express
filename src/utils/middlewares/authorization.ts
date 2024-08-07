import { Request, Response } from "express";
import { failureHandler } from "../successHandler";

const mustBeLoggedIn = (req: Request, res: Response) => {
  if (!req.user) {
    failureHandler(res, "Authentication required");
  }
};

export { mustBeLoggedIn };
