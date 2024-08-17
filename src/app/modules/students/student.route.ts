import { studentController } from "./student.controller";

const route = require("express").Router();

route.post("", studentController.createStudent);

export default route;
