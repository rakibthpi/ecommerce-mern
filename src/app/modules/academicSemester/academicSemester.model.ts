import { Schema, model, Document } from "mongoose";
import IAcademicSemester, {
  IAcademicCode,
  IAcademicName,
  IMonths,
} from "./academicSemester.interface";

export const months: IMonths[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const academicSemesterName: IAcademicName[] = [
  "summer",
  "fall",
  "winter",
  "spring",
];

export const AcademicSemesterCode: IAcademicCode[] = ["01", "02", "03", "04"];

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    name: {
      type: String,
      enum: academicSemesterName,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model using the schema
export const AcademicSemesterModel = model<IAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
