import { model, Schema } from "mongoose";
import AppError from "../../middlewares/AppError";
const academicDepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "academicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError("Department already exists", 400);
  }
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const isId = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(isId);
  if (!isDepartmentExists) {
    throw new AppError("Department ID not found", 404);
  }
  next();
});

export const AcademicDepartment = model(
  "AcademicDepartment",
  academicDepartmentSchema
);
