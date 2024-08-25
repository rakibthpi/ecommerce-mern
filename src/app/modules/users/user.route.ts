import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { studentValidation } from "../students/student.validation";
import validateRequest from "../../middlewares/validateRequest";

const userRoute = express.Router();

userRoute.post(
  "/create-student",
  validateRequest(studentValidation.createStudentZodSchema),
  userController.createController
);

export { userRoute };
