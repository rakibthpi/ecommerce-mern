import { Schema, model, connect } from "mongoose";
import { IStudent } from "./student.interface";

const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

// 3. Create a Model.
export const Student = model<IStudent>("student", studentSchema);
