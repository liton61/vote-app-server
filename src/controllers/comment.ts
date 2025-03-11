import Comment from "@models/Comment";
import Poll from "@models/Poll";
import AppError from "@utils/AppError";
import catchAsync from "@utils/catchAsync";
import sendResponse from "@utils/sendResponse";
import { RequestHandler } from "express";
import mongoose from "mongoose";

export const addComment: RequestHandler = catchAsync(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { text } = req.body;
    const { pollId } = req.params;
    const anonymousId = req.anonymousId;

    // Create a new comment
    const comment = new Comment({ pollId, text, anonymousId });
    await comment.save({ session });

    // Update the poll with the new comment
    await Poll.findByIdAndUpdate(
      pollId,
      {
        $push: { comments: comment._id },
      },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(400, error.message || "An error occurred");
  }
});
