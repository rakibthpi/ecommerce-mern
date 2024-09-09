import validateRequest from "../../middlewares/validateRequest";
import { studentController } from "./student.controller";
import { studentValidation } from "./student.validation";

const studentRoute = require("express").Router();

// will call controller function here

studentRoute.get("/getAll", studentController.findAllStudent);

studentRoute.get("/:studentId", studentController.findSingleStudent);

studentRoute.patch(
  "/:studentId",
  validateRequest(studentValidation.updateStudentZodSchema),
  studentController.updateStudent
);

studentRoute.delete("/:studentId", studentController.deleteStudent);

export { studentRoute };
