import { NextFunction, Request, Response } from "express";
import { userServics } from "./user.service";

const createController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student } = req.body;
    // send response
    const result = await userServics.createStudentIntoDb(password, student);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const userController = { createController };
