import express from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
const route = express.Router();
route.post(
  "/create-faculty",
  validateRequest(AcademicFacultyValidation.academicFacultySchemaZod),
  AcademicFacultyController.createAcademicFaculty
);

route.get(
  "/getAllFacultys",
  AcademicFacultyController.findAllAcademicFaculties
);

route.get("/:id", AcademicFacultyController.findSingleAcademicFaculty);

route.patch(
  "/:id",
  validateRequest(AcademicFacultyValidation.updateAcademicFacultySchemaZod),
  AcademicFacultyController.updateAcademicFaculty
);

export const AcademicFacultyRoute = route;
