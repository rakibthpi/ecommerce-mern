import { IStudent } from "./student.interface";
import { Student } from "./student.model";

// this is handle business logic here
// Find all student from Database
const findallStudentFromDb = async () => {
  try {
    const result = await Student.find()
      .populate("academicSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      });
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
    // const result = await Student.aggregate([{ $match: { id: id } }]);
    const result = await Student.findById(id)
      .populate("academicSemester")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      });
    return result;
  } catch (error) {
    throw error;
  }
};

// Update single student
const updateStudentFromDb = async (id: string, studentInput: IStudent) => {
  try {
    const result = await Student.updateOne({ id }, studentInput, {
      new: true,
    });
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
  findallStudentFromDb,
  findSingleStudentFromDb,
  updateStudentFromDb,
  deleteStudentFromDb,
};
