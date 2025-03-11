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
exports.deletePoll = exports.getPoll = exports.getPolls = exports.createPoll = void 0;
const Poll_1 = __importDefault(require("../models/Poll"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
exports.createPoll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { question, pollType, options, expiresAt, hideResults, isPrivate } = req.body;
    // If it's a yes/no poll, generate the options automatically
    const pollOptions = pollType === "yes-no"
        ? [
            { text: "Yes", votes: 0 },
            { text: "No", votes: 0 },
        ]
        : options;
    const poll = new Poll_1.default({
        anonymousId: req.anonymousId,
        question,
        pollType,
        options: pollOptions,
        expiresAt,
        hideResults,
        isPrivate,
    });
    yield poll.save();
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Poll created successfully",
        data: poll,
    });
}));
exports.getPolls = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const polls = yield Poll_1.default.find({
        anonymousId: req.anonymousId,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: polls,
    });
}));
exports.getPoll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pollId } = req.params;
    const poll = yield Poll_1.default.findById(pollId).populate([
        {
            path: "comments",
            select: "text createdAt",
        },
        {
            path: "reactions",
            select: "reactionType",
        },
    ]);
    if (!poll) {
        throw new AppError_1.default(404, "Poll not found");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        data: poll,
    });
}));
exports.deletePoll = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pollId } = req.params;
    const poll = yield Poll_1.default.findById(pollId);
    if (!poll) {
        throw new AppError_1.default(404, "Poll not found");
    }
    yield Poll_1.default.findByIdAndDelete(pollId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Poll deleted successfully",
        data: null,
    });
}));
//# sourceMappingURL=poll.js.map