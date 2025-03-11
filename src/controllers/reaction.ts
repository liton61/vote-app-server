import Poll from "@models/Poll";
import { Reaction } from "@models/Reaction";
import AppError from "@utils/AppError";
import catchAsync from "@utils/catchAsync";
import sendResponse from "@utils/sendResponse";
import { RequestHandler } from "express";
import mongoose from "mongoose";

export const addReaction: RequestHandler = catchAsync(async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { reactionType } = req.body;
    const { pollId } = req.params;
    const reactorId = req.anonymousId;

    // check anonymousId is already reacted the same reaction type
    const existingReaction = await Reaction.findOne({
      pollId,
      reactionType,
      anonymousId: reactorId,
    });

    if (existingReaction) {
      sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "You have already reacted to this poll",
        data: null,
      });
    }

    const reaction = new Reaction({
      pollId,
      reactionType,
      anonymousId: reactorId,
    });

    await reaction.save({ session });

    await Poll.findByIdAndUpdate(
      pollId,
      { $push: { reactions: reaction._id } },
      { session },
    );

    await session.commitTransaction();

    session.endSession();

    res.status(200).json({
      success: true,
      message: "Reaction added successfully",
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(400, error.message || "An error occurred");
  }
});
