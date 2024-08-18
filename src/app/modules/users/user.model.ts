import { Schema, model, connect } from "mongoose";
import { IUser } from "./user.interface";

// User Schema
const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true, default: false },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked", "active"],
      required: true,
      default: "in-progress",
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

// Create the User model
export const User = model<IUser>("User", userSchema);
