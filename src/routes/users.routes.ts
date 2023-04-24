import { Router } from "express";
import {
  userSchemaRequest,
  userSchemaUpdateRequest,
} from "../schemas/users.schema";
import { ensureBodyValidMiddleware } from "../middlewares/ensureBodyValid.middleware";
import {
  createUser,
  deleteUser,
  listAllUsers,
  readProfile,
  recoverUser,
  updateUser,
} from "../controllers/users.controllers";
import { ensureEmailExistMiddleware } from "../middlewares/ensureEmailExist.middleware";
import { ensureTokenValidMiddleware } from "../middlewares/ensureTokenValid.middleware";
import { ensureIdValidMiddleware } from "../middlewares/ensureIdValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensurePermitionMiddleware } from "../middlewares/ensurePermition.middleware";
import { ensureActiveMiddleware } from "../middlewares/ensureActive.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureBodyValidMiddleware(userSchemaRequest),
  ensureEmailExistMiddleware,
  createUser
);

usersRoutes.get(
  "",
  ensureTokenValidMiddleware,
  ensureIsAdminMiddleware,
  listAllUsers
);

usersRoutes.get("/profile", ensureTokenValidMiddleware, readProfile);

usersRoutes.patch(
  "/:id",
  ensureTokenValidMiddleware,
  ensurePermitionMiddleware,
  ensureIdValidMiddleware,
  ensureBodyValidMiddleware(userSchemaUpdateRequest),
  ensureEmailExistMiddleware,
  updateUser
);

usersRoutes.delete(
  "/:id",
  ensureTokenValidMiddleware,
  ensurePermitionMiddleware,
  ensureIdValidMiddleware,
  deleteUser
);

usersRoutes.put(
  "/:id/recover",
  ensureTokenValidMiddleware,
  ensureIsAdminMiddleware,
  ensureIdValidMiddleware,
  ensureActiveMiddleware,
  recoverUser
);

export { usersRoutes };
