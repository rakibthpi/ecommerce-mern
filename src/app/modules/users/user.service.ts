import mongoose, { Error } from "mongoose";
import config from "../../config";
import { generateStudentId } from "../../utils/user.utils";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../middlewares/AppError";

const createStudentIntoDb = async (password: string, studentData: IStudent) => {
  try {
    const userdata: Partial<IUser> = {};
    userdata.password = password || (config.default_password as string);
    userdata.role = "student";

    // check if academic semester exists
    const academicSemester = await AcademicSemester.findById(
      studentData.academicSemester
    );

    if (!academicSemester) {
      throw new AppError("Academic semester not found", 404);
    }
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      //set generated id
      userdata.id = await generateStudentId(academicSemester);
      // create new user(First transaction)
      const newUser = await User.create([userdata], { session });
      if (!newUser.length) {
        throw new AppError("Failed to create user", 400);
      }
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id;
      // create new Student(Second transaction)
      const result = await Student.create([studentData], { session });
      if (!result.length) {
        throw new AppError("Failed to create student", 400);
      }

      await session.commitTransaction();
      await session.endSession();
      return result;
    } catch (error: Error | any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(error);
    }
  } catch (error) {
    throw error;
  }
};

export const userServics = { createStudentIntoDb };
