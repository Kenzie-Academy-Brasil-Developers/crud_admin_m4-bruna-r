import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";
import { TUserResponseRecover } from "../../interfaces/users.interfaces";

const recoverUserServices = async (
  id: number
): Promise<TUserResponseRecover> => {
  const queryString: string = `
    UPDATE
        users
        SET(active)= ROW(true)
    WHERE
        id = $1
      RETURNING *
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<TUserResponseRecover> = await client.query(
    queryConfig
  );

  return queryResult.rows[0];
};

export { recoverUserServices };
