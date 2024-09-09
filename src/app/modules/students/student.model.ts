import { Schema, model, connect, Types, ObjectId } from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  IUserNameInterface,
  StudentModel,
} from "./student.interface";
import AppError from "../../middlewares/AppError";
// Guardian Schema
const GuardianSchema = new Schema<IGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  FatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

// User Name Schema
const UserNameSchema = new Schema<IUserNameInterface>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

// Local Guardian Schema
const LocalGuardianSchema = new Schema<ILocalGuardian, StudentModel>({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  contactNo: { type: String, required: true },
});

// Student Schema
const StudentSchema = new Schema<IStudent>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "User",
      required: true,
    },
    name: { type: UserNameSchema, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: { type: GuardianSchema, required: true },
    localGuardian: { type: LocalGuardianSchema, required: true },
    profileImage: { type: String, required: true },
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
// add virtual field for fullname
StudentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

StudentSchema.static("isExistUser", async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
});

// update field
StudentSchema.pre("updateOne", async function (next) {
  const isId = this.getQuery();
  const isStudentExists = await Student.findOne(isId);
  if (!isStudentExists) {
    throw new AppError("Student ID not found", 400);
  }
  next();
});

// 3. Create a Model.
// Create the Student model

export const Student = model<IStudent, StudentModel>("student", StudentSchema);
