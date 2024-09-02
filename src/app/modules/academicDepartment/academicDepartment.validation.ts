import { Types } from "mongoose";
import { z } from "zod";

// Define the Zod schema for AcademicDepartment
const academicDepartmentSchemaZod = z.object({
  name: z.string({
    invalid_type_error: "Academic department must be string",
    required_error: "Name is required",
  }),
  academicFaculty: z.string({
    invalid_type_error: "Academic faculty must be string",
    required_error: "Faculty is required",
  }),
});

const udateAcedemicDepartmentSchemaZod = academicDepartmentSchemaZod.partial();

export const academicDepartmentValidation = {
  academicDepartmentSchemaZod,
  udateAcedemicDepartmentSchemaZod,
};
