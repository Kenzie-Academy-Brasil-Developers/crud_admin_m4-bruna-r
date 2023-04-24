import { Router } from "express";
import { ensureBodyValidMiddleware } from "../middlewares/ensureBodyValid.middleware";
import { loginSchemaRequest } from "../schemas/login.schemas";
import { loginUser } from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post("", ensureBodyValidMiddleware(loginSchemaRequest), loginUser);

export { loginRoutes };
