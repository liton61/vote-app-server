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
exports.addReaction = void 0;
const Poll_1 = __importDefault(require("../models/Poll"));
const Reaction_1 = require("../models/Reaction");
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.addReaction = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const { reactionType } = req.body;
        const { pollId } = req.params;
        const reactorId = req.anonymousId;
        // check anonymousId is already reacted the same reaction type
        const existingReaction = yield Reaction_1.Reaction.findOne({
            pollId,
            reactionType,
            anonymousId: reactorId,
        });
        if (existingReaction) {
            (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: 400,
                message: "You have already reacted to this poll",
                data: null,
            });
        }
        const reaction = new Reaction_1.Reaction({
            pollId,
            reactionType,
            anonymousId: reactorId,
        });
        yield reaction.save({ session });
        yield Poll_1.default.findByIdAndUpdate(pollId, { $push: { reactions: reaction._id } }, { session });
        yield session.commitTransaction();
        session.endSession();
        res.status(200).json({
            success: true,
            message: "Reaction added successfully",
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new AppError_1.default(400, error.message || "An error occurred");
    }
}));
//# sourceMappingURL=reaction.js.map