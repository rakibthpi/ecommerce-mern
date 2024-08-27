import { NextFunction, Request, RequestHandler, Response } from "express";
import { academicSemester } from "./academicSemester.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const AcademicSemesterCreate = catchAsync(async (req, res, next) => {
  const result = await academicSemester.academicSemesterIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic semester created successfully",
    data: result,
  });
});

const getAllSemesters = catchAsync(async (req, res, next) => {
  const result = await academicSemester.getAllSemesters();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await academicSemester.getSingleAcademicSemester(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single Data fetched successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await academicSemester.updateAcademicSemester(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic semester updated successfully",
    data: result,
  });
});

export const AcademicSemester = {
  AcademicSemesterCreate,
  getAllSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
