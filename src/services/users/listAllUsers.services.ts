import { QueryResult } from "pg";
import { client } from "../../database";
import {
  TUserResponse,
  TUserResponseArray,
} from "../../interfaces/users.interfaces";

const listAllUsersServices = async (): Promise<TUserResponseArray> => {
  const queryString = `
        SELECT id, name, email, admin, active 
        FROM
            users
    `;

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryString
  );
  const users: TUserResponseArray = queryResult.rows;

  return users;
};

export { listAllUsersServices };
