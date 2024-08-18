import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { studentRoute } from "./app/modules/students/student.route";

app.use(express.json());
app.use(cors());

app.use("/api", studentRoute);

const testingPerpes = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", testingPerpes);

export default app;
