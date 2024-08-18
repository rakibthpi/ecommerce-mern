import { IStudent } from "./student.interface";
import { Student } from "./student.model";

// this is handle business logic here
// Create Student From Database
const createStudentIntoDb = async (studentData: IStudent) => {
  // this is mongoose build in function

  // Statics
  const existingUser = await Student.isExistUser(studentData.id);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const result = await Student.create(studentData);

  // Methods
  // const studentInstaceMethod = new Student(studentData);
  // const userExists = await studentInstaceMethod.isExistUser(studentData.id);
  // if (userExists) {
  //     throw new Error("User already exists");
  // }
  // const result = await studentInstaceMethod.save();

  return result;
};

// Find all student from Database
const findallStudentFromDb = async () => {
  try {
    const result = await Student.find();
    return result;
  } catch (error) {
    console.error("Error finding student:", error);
    throw error;
  }
};

// Find single student from Database
const findSingleStudentFromDb = async (id: string) => {
  try {
    // const result = await Student.findOne({id });
    const result = await Student.aggregate([{ $match: { id: id } }]);
    return result;
  } catch (error) {
    console.error("Single Error finding student:", error);
    throw error;
  }
};

// Update single student
const updateStudentFromDb = async (id: string, studentInput: IStudent) => {
  try {
    const result = await Student.updateOne({ id }, { $set: Student });
    return result;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// Delete Single Student from database
const deleteStudentFromDb = async (id: string) => {
  try {
    const result = await Student.updateOne(
      { id },
      { $set: { isDeleted: true } }
    );
    console.log("Result delete", result);
    return result;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};

export const studentServices = {
  createStudentIntoDb,
  findallStudentFromDb,
  findSingleStudentFromDb,
  updateStudentFromDb,
  deleteStudentFromDb,
};
