"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    pollId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Poll", required: true },
    text: { type: String, required: true },
    anonymousId: { type: String, required: true },
}, { timestamps: true });
const Comment = (0, mongoose_1.model)("Comment", CommentSchema);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map