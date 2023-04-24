import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { TUserResponse } from "../../interfaces/users.interfaces";

const readProfileServices = async (id: number): Promise<TUserResponse> => {
  const queryString = `
        SELECT * 
        FROM
            users
        where 
            id = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponse> = await client.query(
    queryConfig
  );
  const profile = queryResult.rows[0];

  return profile;
};

export { readProfileServices };
