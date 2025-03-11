import { Document, Types } from "mongoose";

export interface IPollOption {
  _id?: string;
  text: string;
  votes: number;
}

export type IPollType = "multiple-choice" | "yes-no";

export interface IPoll extends Document {
  question: string;
  pollType: IPollType;
  options: IPollOption[];
  expiresAt: Date;
  hideResults: boolean;
  isPrivate?: boolean;
  anonymousId?: string;
  comments?: Types.ObjectId[];
  votes?: Types.ObjectId[];
  reactions?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVote {
  pollId: Types.ObjectId;
  pollType: IPollType;
  optionIndex: number;
  anonymousId: string;
  createdAt?: Date;
}

export interface IComment {
  pollId: Types.ObjectId;
  text: string;
  anonymousId: string;
}

export enum ReactionType {
  Trending = "trending",
  Like = "like",
}

export interface IReactions {
  pollId: Types.ObjectId;
  reactionType: ReactionType;
  anonymousId: string;
  createdAt?: Date | string;
}
