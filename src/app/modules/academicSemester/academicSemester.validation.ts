import { z } from "zod";
import {
  AcademicSemesterCode,
  academicSemesterName,
  months,
} from "./academicSemester.model";

const AcademicSemesterZodSchema = z.object({
  name: z.enum(academicSemesterName, {
    required_error: "Semester name is required.",
    invalid_type_error:
      "Semester name must be one of: summer, fall, winter, spring.",
  }),
  year: z.date({
    required_error: "Year is required.",
    invalid_type_error: "Year must be a valid date.",
  }),
  code: z.enum(AcademicSemesterCode, {
    required_error: "Semester code is required.",
    invalid_type_error: "Semester code must be one of: 01, 02, 03, 04.",
  }),
  startMonth: z.enum(months, {
    required_error: "Start month is required.",
    invalid_type_error: "Start month must be a valid month.",
  }),
  endMonth: z.enum(months, {
    required_error: "End month is required.",
    invalid_type_error: "End month must be a valid month.",
  }),
});

// Export the Zod schema
export default AcademicSemesterZodSchema;
