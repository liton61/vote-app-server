"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("../controllers/comment");
const poll_1 = require("../controllers/poll");
const reaction_1 = require("../controllers/reaction");
const vote_1 = require("../controllers/vote");
const express_1 = require("express");
const router = (0, express_1.Router)();
// Poll Routes
router.post("/polls", poll_1.createPoll);
router.get("/polls", poll_1.getPolls);
router.get("/polls/:pollId", poll_1.getPoll);
router.delete("/polls/:pollId", poll_1.deletePoll);
// Voting Route
router.post("/polls/:pollId/votes", vote_1.submitVote);
// Comment Route
router.post("/polls/:pollId/comments", comment_1.addComment);
// Reaction Route
router.post("/polls/:pollId/reactions", reaction_1.addReaction);
exports.default = router;
//# sourceMappingURL=index.js.map