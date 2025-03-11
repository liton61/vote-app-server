import { IPoll, IPollOption } from "@interfaces/index";
import { Schema, model } from "mongoose";

const PollOptionSchema = new Schema<IPollOption>(
  {
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
  },
  {
    _id: false,
  }
);

const PollSchema = new Schema<IPoll>(
  {
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
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    // votes: [{ type: Schema.Types.ObjectId, ref: "Vote" }],
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
  },
  { timestamps: true }
);

const Poll = model<IPoll>("Poll", PollSchema);

export default Poll;
