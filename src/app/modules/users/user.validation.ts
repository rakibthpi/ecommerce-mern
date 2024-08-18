import { z } from "zod";

// Zod schema for IUser
const userZodSchema = z.object({
  id: z.string().nonempty({ message: "ID is required" }),
  password: z
    .string({
      invalid_type_error: "Password is a required field",
    })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" })
    .nonempty({ message: "Password is required" })
    .optional(),
});

export default userZodSchema;
