import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";

const router = express.Router();

router.post(
  "/create-department",
  validateRequest(academicDepartmentValidation.academicDepartmentSchemaZod),
  academicDepartmentController.createAcademicDepartmentController
);

router.get("/getAll", academicDepartmentController.getAllAcademicDepartments);

router.get("/:id", academicDepartmentController.findSingleAcademicDepartment);

router.patch(
  "/:id",
  validateRequest(
    academicDepartmentValidation.udateAcedemicDepartmentSchemaZod
  ),
  academicDepartmentController.updateAcademicDepartment
);

export const AcademicDepartment = router;
