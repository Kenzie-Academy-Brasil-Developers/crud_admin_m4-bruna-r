import { z } from "zod";
import { loginSchemaRequest } from "../schemas/login.schemas";

type TLoginRequest = z.infer<typeof loginSchemaRequest>;

export { TLoginRequest };
