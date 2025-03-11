import { addComment } from "@controllers/comment";
import { createPoll, deletePoll, getPoll, getPolls } from "@controllers/poll";
import { addReaction } from "@controllers/reaction";
import { submitVote } from "@controllers/vote";
import { Router } from "express";

const router = Router();

// Poll Routes
router.post("/polls", createPoll);
router.get("/polls", getPolls);
router.get("/polls/:pollId", getPoll);
router.delete("/polls/:pollId", deletePoll);

// Voting Route
router.post("/polls/:pollId/votes", submitVote);

// Comment Route
router.post("/polls/:pollId/comments", addComment);

// Reaction Route
router.post("/polls/:pollId/reactions", addReaction);

export default router;
