import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { QueryConfig } from "pg";
import { client } from "../database";

const ensureActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
    SELECT
         * 
    FROM 
        users
    WHERE (Id = $1) AND (active = true)
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult = await client.query(queryConfig);
  const active = queryResult.rows[0];

  if (!active) {
    return next();
  }
  throw new AppError("User already active", 400);
};

export { ensureActiveMiddleware };
