import { NextFunction, Request, Response } from "express";

const globalErrorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const data = error.data;
  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
    error: data,
  });
};

export default globalErrorHandler;
