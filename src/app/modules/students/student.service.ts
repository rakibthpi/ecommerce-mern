import mongoose from "mongoose";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";
import AppError from "../../middlewares/AppError";
import { User } from "../users/user.model";

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
    const result = await Student.findOne({ id })
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
const updateStudentFromDb = async (
  id: string,
  studentInput: Partial<IStudent>
) => {
  try {
    const { name, guardian, localGuardian, ...remainingStudentData } =
      studentInput;

    const modifiedUpdateData: Record<string, any> = {
      ...remainingStudentData,
    };
    if (name && Object.keys(name).length > 0) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdateData[`name.${key}`] = value;
      }
    }

    if (guardian && Object.keys(guardian).length > 0) {
      for (const [key, value] of Object.entries(guardian)) {
        modifiedUpdateData[`guardian.${key}`] = value;
      }
    }

    if (localGuardian && Object.keys(localGuardian).length > 0) {
      for (const [key, value] of Object.entries(localGuardian)) {
        modifiedUpdateData[`localGuardian.${key}`] = value;
      }
    }

    if (Object.keys(modifiedUpdateData).length === 0) {
      throw new AppError("No data to update", 400);
    }
    const result = await Student.findOneAndUpdate(
      { id },
      {
        ...modifiedUpdateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return result;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// Delete Single Student from database
const deleteStudentFromDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );

    if (!deletedStudent) {
      throw new AppError("Failed to delete student", 500);
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError("Failed to delete user", 500);
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError("Error deleting student", 500);
  }
};

export const studentServices = {
  findallStudentFromDb,
  findSingleStudentFromDb,
  updateStudentFromDb,
  deleteStudentFromDb,
};
