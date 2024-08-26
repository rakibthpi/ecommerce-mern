import { NextFunction, Request, RequestHandler, Response } from "express";
import { academicSemester } from "./academicSemester.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const asyncAwit = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const AcademicSemesterCreate = catchAsync(async (req, res, next) => {
  const result = await academicSemester.academicSemesterIntoDb(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic semester created successfully",
    data: result,
  });
});

export const AcademicSemester = {
  AcademicSemesterCreate,
};
