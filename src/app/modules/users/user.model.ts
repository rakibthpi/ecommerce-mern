import { Schema, model, connect } from "mongoose";
import { IUser } from "./user.interface";

// User Schema
const userSchema = new Schema<IUser>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  needsPasswordChange: { type: Boolean, required: true, default: false },
  role: { type: String, enum: ["admin", "user"], required: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
    default: "active",
  },
  isDeleted: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

// Create the User model
export const User = model<IUser>("User", userSchema);
