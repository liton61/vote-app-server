export class AppError extends Error {
  public statusCode: number;
  public status: string;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
