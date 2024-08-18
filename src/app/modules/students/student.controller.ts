import { Request, Response } from "express";
import { studentServices } from "./student.service";
import studentZodSchema from "./student.validation";

// Find all students
const findAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.findallStudentFromDb();
    res.status(200).json({
      success: true,
      message: "All Data fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const findSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studdentid } = req.params;
    const result = await studentServices.findSingleStudentFromDb(studdentid);
    res.status(200).json({
      success: true,
      message: "Single Data fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
// Update student area
const updateStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params;
    const { student } = req.body;
    const result = await studentServices.updateStudentFromDb(
      studentid,
      student
    );
    res.status(200).json({
      success: true,
      message: "Single Data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params;
    const result = await studentServices.deleteStudentFromDb(studentid);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const studentController = {
  findAllStudent,
  findSingleStudent,
  updateStudent,
  deleteStudent,
};
