import { NextFunction, Request, Response } from "express";
import { userServics } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createController = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;
  // send response
  const result = await userServics.createStudentIntoDb(password, student);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const userController = { createController };
