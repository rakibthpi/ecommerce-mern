import express from "express";
import { studentRoute } from "../modules/students/student.route";
import { userRoute } from "../modules/users/user.route";

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
];

// route.use("/api/students", studentRoute);
routeArray.forEach((route) => mainRoutes.use(route.path, route.route));

export default mainRoutes;
