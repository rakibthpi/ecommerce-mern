import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { ErrorSources } from "../interface/error"; // Assuming you have this interface for error sources
import handleZoodError from "../errors/handleZodError";
import config from "../config";
import handleMongooseError from "../errors/handleMongooseError";
import { Types } from "mongoose";
import handleCastError from "../errors/handleCastError";
import handleDuplicateValue from "../errors/handleDuplicateValue";

const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  // Setting default values
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  let errorSources: ErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  let errorMessages: string[] = [];
  if (error instanceof ZodError) {
    const simpleFication = handleZoodError(error);

    statusCode = simpleFication.statusCode;
    message = simpleFication.message;
    errorSources = simpleFication.errorSources;
  } else if (error?.name === "ValidationError") {
    const simpleFication = handleMongooseError(error);

    statusCode = simpleFication.statusCode;
    message = simpleFication.message;
    errorSources = simpleFication.errorSources;
  } else if (error?.name === "CastError") {
    const simpleFication = handleCastError(error);

    statusCode = simpleFication.statusCode;
    message = simpleFication.message;
    errorSources = simpleFication.errorSources;
  } else if (error.errorResponse.code === 11000) {
    const simpleFication = handleDuplicateValue(error);
    statusCode = simpleFication.statusCode;
    message = simpleFication.message;
    errorSources = simpleFication.errorSources;
  }
  const finalMessage =
    errorMessages.length === 1 ? errorMessages[0] : errorMessages.join(", ");
  // Optionally handle other specific error types (e.g., Mongoose validation errors, JWT errors, etc.)
  // Types of errors:

  // Send error response
  return res.status(statusCode).json({
    success: false,
    message: finalMessage || message,
    errorSources,
    error: error,
    stack: config.env === "development" ? error.stack : null,
  });
};

export default globalErrorHandler;
