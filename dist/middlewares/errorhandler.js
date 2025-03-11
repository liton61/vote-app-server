"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../config/env"));
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const success = false;
    let message = err.message || "Internal Server Error";
    let errors = err.errors || null;
    if (err.name === "ValidationError") {
        message = "Validation Error";
        errors = Object.values(err.errors).map((error) => {
            const field = error.path.charAt(0).toUpperCase() + error.path.slice(1);
            return `${field} is required.`;
        });
    }
    else if (err.name === "CastError") {
        message = "Invalid ID";
    }
    res.status(statusCode).json({
        success,
        message,
        errors,
        stack: env_1.default.NODE_ENV === "development" ? err.stack : undefined,
    });
};
exports.default = errorHandler;
//# sourceMappingURL=errorhandler.js.map