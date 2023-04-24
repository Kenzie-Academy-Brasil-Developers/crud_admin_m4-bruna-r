import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { TUserResponse } from "../interfaces/users.interfaces";

const ensureEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: string = req.body.email;

  const queryString: string = `
      SELECT 
            email
        FROM 
            users
        WHERE email = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [payload],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );

  if (queryResult.rows[0]) {
    return res.status(409).json({ message: "E-mail already registered" });
  }

  next();
};

export { ensureEmailExistMiddleware };
