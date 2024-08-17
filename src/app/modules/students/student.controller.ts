import { Request, Response } from "express";
import { studentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const studetnData = req.body;
    const result = await studentServices.createStudentIntoDb(studetnData);
    res.status(200).json({
      status: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      data: err,
    });
  }
};

export const studentController = {
  createStudent,
};
