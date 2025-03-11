import { IComment } from "@interfaces/index";
import { Schema, model, Document } from "mongoose";

const CommentSchema = new Schema<IComment>(
  {
    pollId: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    text: { type: String, required: true },
    anonymousId: { type: String, required: true },
  },
  { timestamps: true },
);

const Comment = model<IComment>("Comment", CommentSchema);

export default Comment;
