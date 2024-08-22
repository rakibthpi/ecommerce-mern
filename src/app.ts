import express, { Request, Response, NextFunction } from "express";
const app = express();
import cors from "cors";
import { studentRoute } from "./app/modules/students/student.route";
import { userRoute } from "./app/modules/users/user.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import mainRoutes from "./app/route";

app.use(express.json());
app.use(cors());

// main Routes
app.use("/api", mainRoutes);

const testingPerpes = (req: Request, res: Response) => {
  res.send("Hello World!");
};
app.get("/", testingPerpes);

// Handle 404 - Not Found
app.use(notFound);

app.use(globalErrorHandler);

export default app;
