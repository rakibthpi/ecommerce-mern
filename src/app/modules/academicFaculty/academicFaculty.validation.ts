import { z } from "zod";

// Define the Zod schema for IAcademicFaculty
const academicFacultySchemaZod = z.object({
  name: z.string({
    invalid_type_error: "Faculty Name is a required field",
  }),

  createdAt: z
    .date()
    .optional()
    .refine((date) => date === undefined || !isNaN(date.getTime()), {
      message: "Invalid date format for createdAt.",
    }),

  updatedAt: z
    .date()
    .optional()
    .refine((date) => date === undefined || !isNaN(date.getTime()), {
      message: "Invalid date format for updatedAt.",
    }),
});

// Define the Zod schema for IAcademicFaculty
const updateAcademicFacultySchemaZod = academicFacultySchemaZod.partial();

// Export the Zod schemas
export const AcademicFacultyValidation = {
  academicFacultySchemaZod,
  updateAcademicFacultySchemaZod,
};
