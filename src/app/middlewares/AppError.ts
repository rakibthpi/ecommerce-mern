class AppError extends Error {
  public statusCode: string | number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: string | number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
