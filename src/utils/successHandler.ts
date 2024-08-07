import { Response } from "express";

const successHandler = (res: Response, msg: any, status?: number) => {
  return res.status(status ?? 200).json({
    status: "SUCCESS",
    msg,
  });
};

const failureHandler = (res: Response, msg: any, status?: number) => {
  return res.status(status ?? 401).json({
    status: "FAILED",
    msg,
  });
};

export { successHandler, failureHandler };
