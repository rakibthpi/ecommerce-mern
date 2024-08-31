import { model, Schema } from "mongoose";
const academicDepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Save per and post area  start
academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  console.log("RRR", isDepartmentExists);
  if (isDepartmentExists) {
    throw new Error("Department already exists");
  }
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const isId = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(isId);
  console.log("RRR", isDepartmentExists);
  if (!isDepartmentExists) {
    throw new Error("Id not found");
  }
  next();
});

export const AcademicDepartment = model(
  "AcademicDepartment",
  academicDepartmentSchema
);
