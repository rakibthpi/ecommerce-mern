import express from "express";
import { studentRoute } from "../modules/students/student.route";
import { userRoute } from "../modules/users/user.route";
import { AcademicRoute } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";

const mainRoutes = express.Router();

const routeArray = [
  {
    path: "/students",
    route: studentRoute,
  },

  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/academic-semester",
    route: AcademicRoute,
  },
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoute,
  },
];

// route.use("/api/students", studentRoute);
routeArray.forEach((route) => mainRoutes.use(route.path, route.route));

export default mainRoutes;
