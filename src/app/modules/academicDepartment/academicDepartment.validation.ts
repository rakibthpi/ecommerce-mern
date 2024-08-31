import { z } from "zod";

// Define the Zod schema for AcademicDepartment
const academicDepartmentSchemaZod = z.object({
  name: z
    .string({
      required_error: "Department name is required",
      invalid_type_error: "Department name must be a string",
    })
    .nonempty({ message: "Department name cannot be empty" }),

  academicFaculty: z
    .string({
      required_error: "Academic Faculty ID is required",
      invalid_type_error: "Academic Faculty ID must be a valid ObjectId string",
    })
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: "Invalid ObjectId format for Academic Faculty",
    }),

  // Since timestamps are automatically handled by Mongoose, no need to validate them here.
});

const udateAcedemicDepartmentSchemaZod = academicDepartmentSchemaZod.partial();

export const academicDepartmentValidation = {
  academicDepartmentSchemaZod,
  udateAcedemicDepartmentSchemaZod,
};
