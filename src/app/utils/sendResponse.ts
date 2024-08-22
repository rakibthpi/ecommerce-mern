import { Response } from "express";

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(200).json({
    success: true,
    message: data.message || "Data fetched successfully",
    data: data.data,
  });
};

export default sendResponse;
