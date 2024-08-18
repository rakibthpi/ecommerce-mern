import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import { studentRoute } from "./app/modules/students/student.route";
import { userRoute } from "./app/modules/users/user.route";

app.use(express.json());
app.use(cors());

app.use("/api", studentRoute);
app.use("/api", userRoute);

const testingPerpes = (req: Request, res: Response) => {
  res.send("Hello World!");
};
app.get("/", testingPerpes);

export default app;
