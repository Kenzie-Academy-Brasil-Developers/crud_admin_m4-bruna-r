import format from "pg-format";
import { QueryResult } from "pg";
import {
  TUser,
  TUserRequest,
  TUserResponse,
} from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { hash } from "bcryptjs";
import { userSchemaResponse } from "../../schemas/users.schema";

const createUserServices = async (
  payload: TUserRequest
): Promise<TUserResponse> => {
  const hashPassword: string = await hash(payload.password, 10);

  payload.password = hashPassword;
  const queryString: string = format(
    `
        INSERT INTO 
                users(%I)
            VALUES
                (%L)
            RETURNING *;

    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TUser> = await client.query(queryString);
  const newUser: TUserResponse = userSchemaResponse.parse(queryResult.rows[0]);

  return newUser;
};

export { createUserServices };
