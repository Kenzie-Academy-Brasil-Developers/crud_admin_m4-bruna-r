import { QueryConfig, QueryResult } from "pg";
import { TUser } from "../../interfaces/users.interfaces";
import { client } from "../../database";
import { TLoginRequest } from "../../interfaces/login.interfaces";
import { AppError } from "../../error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const createLoginServices = async (payload: TLoginRequest): Promise<string> => {
  const queryString: string = `
        SELECT * FROM
            users
        WHERE 
            email = $1
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [payload.email],
  };

  const queryResult: QueryResult<TUser> = await client.query(queryConfig);
  const userExist = queryResult.rows[0];

  if (!userExist) {
    throw new AppError("Wrong email/password", 401);
  }

  const comparePassword = await compare(payload.password, userExist.password);

  if (!comparePassword) {
    throw new AppError("Wrong email/password", 401);
  }

  if (!userExist.active) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    {
      admin: userExist.admin,
      subject: String(userExist.id),
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export { createLoginServices };
