import { Schema, model, connect } from "mongoose";
export interface IStudent {
  name: string;
  email: string;
  avatar?: string;
}
