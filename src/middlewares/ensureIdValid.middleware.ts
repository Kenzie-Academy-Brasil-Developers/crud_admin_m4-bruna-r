import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";

const ensureIdValidMiddleware = async (
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
    WHERE Id = $1
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult = await client.query(queryConfig);
  const userById = queryResult.rows[0];

  if (!userById) {
    return res.status(404).json({ message: "User not found" });
  }

  if (req.route.path === "recover") {
    res.locals.active = {
      active: userById.active,
    };
  }

  return next();
};

export { ensureIdValidMiddleware };
