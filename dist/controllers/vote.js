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
exports.submitVote = void 0;
const Poll_1 = __importDefault(require("../models/Poll"));
const Vote_1 = require("../models/Vote");
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.submitVote = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const { optionIndex } = req.body;
        const { pollId } = req.params;
        const voterId = req.anonymousId;
        const poll = yield Poll_1.default.findById(pollId).session(session);
        if (!poll) {
            yield session.abortTransaction();
            throw new AppError_1.default(404, "The poll you are trying to vote on does not exist");
        }
        // Check if the user has already voted on this poll
        const existingVote = yield Vote_1.Vote.findOne({ pollId, voterId }).session(session);
        if (existingVote) {
            yield session.abortTransaction();
            throw new AppError_1.default(400, "You have already voted on this poll");
        }
        const vote = new Vote_1.Vote({
            pollId,
            pollType: poll.pollType,
            optionIndex,
            anonymousId: voterId,
        });
        yield vote.save({ session });
        poll.options[optionIndex].votes += 1;
        yield poll.save({ session });
        yield session.commitTransaction();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: "Vote submitted successfully",
            data: vote,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        throw new AppError_1.default(500, error.message || "Internal server error");
    }
    finally {
        session.endSession();
    }
}));
//# sourceMappingURL=vote.js.map