import env from "@config/env";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const success = false;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || null;

  if (err.name === "ValidationError") {
    message = "Validation Error";
    errors = Object.values(err.errors).map((error: any) => {
      const field = error.path.charAt(0).toUpperCase() + error.path.slice(1);
      return `${field} is required.`;
    });
  } else if (err.name === "CastError") {
    message = "Invalid ID";
  }

  res.status(statusCode).json({
    success,
    message,
    errors,
    stack: env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
