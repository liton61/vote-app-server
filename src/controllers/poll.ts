import Poll from "@models/Poll";
import AppError from "@utils/AppError";
import catchAsync from "@utils/catchAsync";
import sendResponse from "@utils/sendResponse";
import { Request, RequestHandler, Response } from "express";

export const createPoll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { question, pollType, options, expiresAt, hideResults, isPrivate } =
      req.body;

    // If it's a yes/no poll, generate the options automatically
    const pollOptions =
      pollType === "yes-no"
        ? [
            { text: "Yes", votes: 0 },
            { text: "No", votes: 0 },
          ]
        : options;

    const poll = new Poll({
      anonymousId: req.anonymousId,
      question,
      pollType,
      options: pollOptions,
      expiresAt,
      hideResults,
      isPrivate,
    });
    await poll.save();
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Poll created successfully",
      data: poll,
    });
  },
);

export const getPolls: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const polls = await Poll.find({
      anonymousId: req.anonymousId,
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: polls,
    });
  },
);

export const getPoll: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { pollId } = req.params;
    const poll = await Poll.findById(pollId).populate([
      {
        path: "comments",
        select: "text createdAt",
      },
      {
        path: "reactions",
        select: "reactionType",
      },
    ]);

    if (!poll) {
      throw new AppError(404, "Poll not found");
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: poll,
    });
  },
);

export const deletePoll = catchAsync(async (req: Request, res: Response) => {
  const { pollId } = req.params;

  const poll = await Poll.findById(pollId);

  if (!poll) {
    throw new AppError(404, "Poll not found");
  }
  await Poll.findByIdAndDelete(pollId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Poll deleted successfully",
    data: null,
  });
});
