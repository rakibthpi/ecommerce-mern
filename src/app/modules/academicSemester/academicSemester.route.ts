import express from "express";
import { AcademicSemester } from "./academicSemester.controller";
import { AcademicSemesterValidation } from "./academicSemester.validation";
import validateRequest from "../../middlewares/validateRequest";

// const AcademicRoute = require("express").Router();
// const AcademicRoute = express.Router();

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
  AcademicSemester.AcademicSemesterCreate
);

export const AcademicRoute = router;
