import { Request, Response } from "express";
import { userServics } from "./user.service";
import { studentServices } from "../students/student.service";

const createController = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const userController = { createController };
