import { z } from "zod";
import registerRequestBodySchema from "./registerValidationSchema";

const loginRequestBodySchema = z.object({
  email: registerRequestBodySchema.shape.email,
  password: registerRequestBodySchema.shape.password,
});

export type LoginRequestBodySchema = z.infer<typeof loginRequestBodySchema>;

export default loginRequestBodySchema;
