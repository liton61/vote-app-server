import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

declare global {
  namespace Express {
    interface Request {
      anonymousId: string;
    }
  }
}

export const setAnonymousId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let anonymousId = req.cookies.anonymousId || req.headers["x-anonymous-id"];

  if (!anonymousId) {
    anonymousId = uuidv4();
    res.cookie("anonymousId", anonymousId, {
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  }

  (req as Request).anonymousId = anonymousId;
  next();
};
