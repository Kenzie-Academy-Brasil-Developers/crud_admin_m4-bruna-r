import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const active: boolean = res.locals.active;

  if (active) {
    throw new AppError("User already active", 400);
  }

  next();
};

export { ensureActiveMiddleware };
