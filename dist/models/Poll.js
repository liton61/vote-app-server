"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PollOptionSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
}, {
    _id: false,
});
const PollSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    pollType: {
        type: String,
        enum: ["multiple-choice", "yes-no"],
        required: true,
    },
    options: { type: [PollOptionSchema], required: true },
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    hideResults: { type: Boolean, default: false },
    isPrivate: { type: Boolean, default: false },
    anonymousId: { type: String, default: null },
    comments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" }],
    // votes: [{ type: Schema.Types.ObjectId, ref: "Vote" }],
    reactions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Reaction" }],
}, { timestamps: true });
const Poll = (0, mongoose_1.model)("Poll", PollSchema);
exports.default = Poll;
//# sourceMappingURL=Poll.js.map