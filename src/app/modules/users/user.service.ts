import config from "../../config";
import { generateStudentId } from "../../utils/user.utils";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { IStudent } from "../students/student.interface";
import { Student } from "../students/student.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDb = async (password: string, studentData: IStudent) => {
  try {
    const userdata: Partial<IUser> = {};
    userdata.password = password || (config.default_password as string);
    userdata.role = "student";

    const academicSemester = await AcademicSemester.findById(
      studentData.academicSemester
    );

    if (!academicSemester) {
      throw new Error("Academic semester not found");
    }
    userdata.id = await generateStudentId(academicSemester);

    const newUser = await User.create(userdata);
    if (Object.keys(newUser).length) {
      studentData.id = newUser.id;
      studentData.user = newUser._id;
      const result = await Student.create(studentData);
      return result;
    }
  } catch (error) {
    throw error;
  }
};

export const userServics = { createStudentIntoDb };
