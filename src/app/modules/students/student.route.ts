import { studentController } from "./student.controller";

const studentRoute = require("express").Router();

// will call controller function here
studentRoute.post("/create-student", studentController.createStudent);

studentRoute.get("/getAll", studentController.findAllStudent);

studentRoute.get("/:studdentid", studentController.findSingleStudent);

studentRoute.patch("/:studentid", studentController.updateStudent);

studentRoute.delete("/:studentid", studentController.deleteStudent);

export { studentRoute };
