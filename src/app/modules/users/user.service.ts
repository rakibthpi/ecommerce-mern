import config from "../../config";
import { IStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDb = async (password: string, studentData: IStudent) => {
  try {
    const userdata: Partial<IUser> = {
      password: password || (config.default_password as string),
      role: "student",
      id: "20240101",
    };

    const newUser = await User.create(userdata);
    if (Object.keys(newUser).length) {
      studentData.id = newUser.id;
      studentData.user = newUser._id;
      const result = await Student.create(studentData);
      return result;
    }
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

export const userServics = { createStudentIntoDb };
