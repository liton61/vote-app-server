"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const mongoose_1 = require("mongoose");
const VoteSchema = new mongoose_1.Schema({
    pollId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Poll", required: true },
    pollType: {
        type: String,
        enum: ["multiple-choice", "yes-no"],
        required: true,
    },
    optionIndex: { type: Number, required: true },
    anonymousId: { type: String, required: true },
}, { timestamps: true });
exports.Vote = (0, mongoose_1.model)("Vote", VoteSchema);
//# sourceMappingURL=Vote.js.map