import { Schema, model, connect } from "mongoose";
export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  status: "active" | "in-progress" | "blocked" | "inactive";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
