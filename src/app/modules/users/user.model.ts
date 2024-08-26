import { Schema, model, connect } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

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

// Save per and post area  start
// Pre-save hook to hash the password before saving the user
// Save per and post area  start

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    // Hash the password with a salt round of 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.post("save", function (doc, next) {
  this.password = " ";
  next();
});

// Create the User model
export const User = model<IUser>("User", userSchema);
