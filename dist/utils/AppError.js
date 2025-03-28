"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.name = "AppError";
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
exports.default = AppError;
//# sourceMappingURL=AppError.js.map