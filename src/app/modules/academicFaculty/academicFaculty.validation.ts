import { z } from "zod";

// Define the Zod schema for IAcademicFaculty
const academicFacultySchemaZod = z.object({
  name: z.string({
    invalid_type_error: "Faculty Name is a required field",
  }),
});

// Define the Zod schema for IAcademicFaculty
const updateAcademicFacultySchemaZod = academicFacultySchemaZod.partial();

// Export the Zod schemas
export const AcademicFacultyValidation = {
  academicFacultySchemaZod,
  updateAcademicFacultySchemaZod,
};
