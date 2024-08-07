import { z } from "zod";

const registerRequestBodySchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Enter a valid email",
    })
    .trim()
    .email({
      message: "Enter a valid email",
    }),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Enter a valid name",
      message: "Enter a valid name",
    })
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(64, "Name cannot be longer than 64 characters")
    .regex(/[a-zA-Z]/, "Name must contain at least one alphabet"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Enter a valid password",
      message: "Enter a valid password",
    })
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password cannot be longer than 64 characters"),
});

export type RegisterRequestBodySchema = z.infer<
  typeof registerRequestBodySchema
>;

export default registerRequestBodySchema;
