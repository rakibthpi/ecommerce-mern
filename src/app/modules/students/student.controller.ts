import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

// Find all students
const findAllStudent = catchAsync(async (req, res, next) => {
  const result = await studentServices.findallStudentFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

const findSingleStudent = catchAsync(async (req, res, next) => {
  const { studdentid } = req.params;
  const result = await studentServices.findSingleStudentFromDb(studdentid);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single Data fetched successfully",
    data: result,
  });
});
// Update student area
const updateStudent = catchAsync(async (req, res, next) => {
  const { studentid } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateStudentFromDb(studentid, student);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentid } = req.params;
  const result = await studentServices.deleteStudentFromDb(studentid);
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
