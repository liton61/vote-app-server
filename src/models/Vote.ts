import { IVote } from "@interfaces/index";
import { Schema, model } from "mongoose";
import Poll from "./Poll";

const VoteSchema = new Schema<IVote>(
  {
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    pollType: {
      type: String,
      enum: ["multiple-choice", "yes-no"],
      required: true,
    },
    optionIndex: { type: Number, required: true },
    anonymousId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Vote = model<IVote>("Vote", VoteSchema);
