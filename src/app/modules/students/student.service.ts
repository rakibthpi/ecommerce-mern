import { IStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDb = async (student: IStudent) => {
  try {
    const newStudent = new Student(student);
    const result = await newStudent.save();
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const studentServices = {
  createStudentIntoDb,
};
