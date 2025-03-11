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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
const Poll_1 = __importDefault(require("../models/Poll"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.addComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { text } = req.body;
        const { pollId } = req.params;
        const anonymousId = req.anonymousId;
        // Create a new comment
        const comment = new Comment_1.default({ pollId, text, anonymousId });
        yield comment.save({ session });
        // Update the poll with the new comment
        yield Poll_1.default.findByIdAndUpdate(pollId, {
            $push: { comments: comment._id },
        }, { session });
        yield session.commitTransaction();
        session.endSession();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 201,
            message: "Comment added successfully",
            data: comment,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(400, error.message || "An error occurred");
    }
}));
//# sourceMappingURL=comment.js.map