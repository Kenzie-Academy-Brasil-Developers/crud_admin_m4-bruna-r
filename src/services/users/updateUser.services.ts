import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { Request, Response } from "express";
import {
  TUserResponse,
  TUserUpdateRequest,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";

const updateUserServices = async (
  payload: TUserUpdateRequest,
  id: number
): Promise<TUserResponse> => {
  const queryString: string = format(
    `
        UPDATE 
            users
        SET(%I) = ROW(%L)
        WHERE
            Id = $1
        RETURNING *;

`,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );
  const userUpdate: TUserResponse = queryResult.rows[0];

  return userUpdate;
};

export { updateUserServices };
