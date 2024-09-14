import mongoose from "mongoose";
import { ErrorSources, TGenericErrorResponse } from "../interface/error";

const handleMongooseError = (
  error: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: ErrorSources = Object.values(error.errors).map((val) => {
    console.log(val?.message);
    return {
      path: val?.path,
      message: val?.message,
    };
  });
  console.log(errorSources);
  return {
    statusCode: 400,
    message: "Mongoose validation Error",
    errorSources,
  };
};
export default handleMongooseError;
