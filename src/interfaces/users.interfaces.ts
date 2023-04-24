import { z } from "zod";
import {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userSchemaResponseArray,
  userSchemaUpdateRequest,
  userschemaResponseRecover,
} from "../schemas/users.schema";

type TUser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TUserResponseArray = z.infer<typeof userSchemaResponseArray>;
type TUserUpdateRequest = z.infer<typeof userSchemaUpdateRequest>;
type TUserResponseRecover = z.infer<typeof userschemaResponseRecover>;

export {
  TUser,
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
  TUserResponseArray,
  TUserResponseRecover,
};
