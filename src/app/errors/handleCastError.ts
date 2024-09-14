import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

const handleCastError = (
  error: mongoose.Error.CastError
): TGenericErrorResponse => {
  //   console.log(error);
  const message = `Resource not found. Invalid ${error.path}: ${error.value}`;
  return {
    statusCode: 400,
    message,
    errorSources: [
      {
        path: error.path,
        message: error.message,
      },
    ],
  };
};

export default handleCastError;
