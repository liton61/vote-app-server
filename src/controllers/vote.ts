import Poll from "@models/Poll";
import { Vote } from "@models/Vote";
import AppError from "@utils/AppError";
import catchAsync from "@utils/catchAsync";
import sendResponse from "@utils/sendResponse";
import { RequestHandler } from "express";
import mongoose from "mongoose";

export const submitVote: RequestHandler = catchAsync(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { optionIndex } = req.body;
    const { pollId } = req.params;
    const voterId = req.anonymousId;

    const poll = await Poll.findById(pollId).session(session);
    if (!poll) {
      await session.abortTransaction();
      throw new AppError(
        404,
        "The poll you are trying to vote on does not exist",
      );
    }

    // Check if the user has already voted on this poll
    const existingVote = await Vote.findOne({ pollId, voterId }).session(
      session,
    );
    if (existingVote) {
      await session.abortTransaction();
      throw new AppError(400, "You have already voted on this poll");
    }

    const vote = new Vote({
      pollId,
      pollType: poll.pollType,

      optionIndex,
      anonymousId: voterId,
    });
    await vote.save({ session });

    poll.options[optionIndex].votes += 1;
    await poll.save({ session });

    await session.commitTransaction();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Vote submitted successfully",
      data: vote,
    });
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(500, error.message || "Internal server error");
  } finally {
    session.endSession();
  }
});
