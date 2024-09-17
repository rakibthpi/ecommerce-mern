import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

// Find all students
const findAllStudent = catchAsync(async (req, res, next) => {
  const result = await studentServices.findallStudentFromDb(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});
// Find single student
const findSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await studentServices.findSingleStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single Data fetched successfully",
    data: result,
  });
});
// Update student area
const updateStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentFromDb(studentId, student);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});
// Deleted student
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDb(studentId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student deleted successfully",
    data: result,
  });
});

export const studentController = {
  findAllStudent,
  findSingleStudent,
  updateStudent,
  deleteStudent,
};
