import { model, Schema } from "mongoose";
import { IAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  }
);

export const AcademicFaculty = model<IAcademicFaculty>(
  "academicfaculty",
  academicFacultySchema
);
