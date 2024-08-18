import { Schema, model, connect } from "mongoose";
export interface IUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "admin" | "user";
  status: "active" | "inactive";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
