"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reaction = void 0;
const index_1 = require("../interfaces/index");
const mongoose_1 = require("mongoose");
const ReactionSchema = new mongoose_1.Schema({
    pollId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Poll", required: true },
    reactionType: {
        type: String,
        enum: Object.values(index_1.ReactionType),
        required: true,
    },
    anonymousId: { type: String, required: true },
}, { timestamps: true });
exports.Reaction = (0, mongoose_1.model)("Reaction", ReactionSchema);
//# sourceMappingURL=Reaction.js.map