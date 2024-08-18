import { z } from "zod";

// Zod schema for IUser
const userZodSchema = z.object({
  id: z.string().nonempty({ message: "ID is required" }),
  password: z.string().nonempty({ message: "Password is required" }),
  needsPasswordChange: z.boolean().default(false),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role must be either 'admin' or 'user'" }),
  }),
  status: z
    .enum(["active", "inactive"], {
      errorMap: () => ({
        message: "Status must be either 'active' or 'inactive'",
      }),
    })
    .default("active"),
  isDeleted: z.boolean().default(false),
  createdAt: z
    .date()
    .default(() => new Date())
    .optional(),
  updatedAt: z
    .date()
    .default(() => new Date())
    .optional(),
});

export default userZodSchema;
