import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { failureHandler } from "../successHandler";

const validator = (
  validationSchema: z.AnyZodObject
): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req, res, next) => {
    const { body } = req;

    const result = validationSchema.safeParse(body);

    if (!result.success) {
      type ValidationSchemaType = z.infer<typeof validationSchema>;
      const error: ValidationSchemaType = {};

      result.error.issues.forEach((issue) => {
        error[issue.path[0]] = issue.message;
      });

      return failureHandler(res, {
        name: "ValidationError",
        data: result.error.flatten().fieldErrors,
      });
    }

    req.body = result.data;

    next();
  };
};

export default validator;
