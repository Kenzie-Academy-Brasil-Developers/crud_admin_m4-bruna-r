import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const ensureBodyValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const payload = schema.parse(req.body);
    req.body = payload;

    next();
  };

export { ensureBodyValidMiddleware };
