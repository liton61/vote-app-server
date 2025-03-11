import { IReactions, ReactionType } from "@interfaces/index";
import { Schema, model, Document } from "mongoose";

const ReactionSchema = new Schema<IReactions>(
  {
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    reactionType: {
      type: String,
      enum: Object.values(ReactionType),
      required: true,
    },
    anonymousId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Reaction = model<IReactions>("Reaction", ReactionSchema);
