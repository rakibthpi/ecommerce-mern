import { ZodError, ZodIssue } from "zod";
import { TGenericErrorResponse } from "../interface/error";

const handleZoodError = (error: ZodError): TGenericErrorResponse => {
  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources: error.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      };
    }),
  };
};

export default handleZoodError;
