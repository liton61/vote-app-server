"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).json({
        success: false,
        message: "The route you are looking for does not exist!",
        error: {
            path: req.originalUrl,
            method: req.method,
            message: "You reached a route that is not defined on this server",
        },
    });
});
exports.default = notFound;
//# sourceMappingURL=notFound.js.map