import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { ErrorSources } from "../interface/error"; // Assuming you have this interface
import handleZodError from "../errors/handleZodError";
import config from "../config";
import handleMongooseError from "../errors/handleMongooseError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateValue from "../errors/handleDuplicateValue";
import AppError from "./AppError";

const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";

  let errorSources: ErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (error instanceof ZodError) {
    const simplification = handleZodError(error);
    statusCode = simplification.statusCode;
    message = simplification.message;
    errorSources = simplification.errorSources;
  } else if (error.name === "ValidationError") {
    const simplification = handleMongooseError(error);
    statusCode = simplification.statusCode;
    message = simplification.message;
    errorSources = simplification.errorSources;
  } else if (error.name === "CastError") {
    const simplification = handleCastError(error);
    statusCode = simplification.statusCode;
    message = simplification.message;
    errorSources = simplification.errorSources;
  } else if (error.code === 11000) {
    const simplification = handleDuplicateValue(error);
    statusCode = simplification.statusCode;
    message = simplification.message;
    errorSources = simplification.errorSources;
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSources = [
      {
        path: "",
        message: error.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    error: config.env === "development" ? error : undefined,
    stack: config.env === "development" ? error.stack : null,
  });
};

export default globalErrorHandler;
