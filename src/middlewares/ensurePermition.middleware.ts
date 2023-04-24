import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensurePermitionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.route.path.id);
  const admin = res.locals.token.admin;
  const idtoken = parseInt(res.locals.token.id);

  if (admin || id === idtoken) {
    return next();
  } else {
    throw new AppError("Insufficient Permission", 403);
  }
};
export { ensurePermitionMiddleware };
