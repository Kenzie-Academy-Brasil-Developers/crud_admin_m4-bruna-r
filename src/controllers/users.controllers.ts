import { Request, Response } from "express";
import {
  TUserRequest,
  TUserResponse,
  TUserResponseArray,
  TUserUpdateRequest,
} from "../interfaces/users.interfaces";
import { createUserServices } from "../services/users/createUser.services";
import { updateUserServices } from "../services/users/updateUser.services";
import { deleteUserServices } from "../services/users/deleteUser.services";
import { listAllUsersServices } from "../services/users/listAllUsers.services";
import { readProfileServices } from "../services/users/readProfile.services";
import { recoverUserServices } from "../services/users/recoverUser.services";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: TUserRequest = req.body;

  const newUser: TUserResponse = await createUserServices(payload);

  return res.status(201).json(newUser);
};

const listAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const token = req.headers.authorization;

  const users: TUserResponseArray = await listAllUsersServices();
  return res.status(200).json(users);
};

const readProfile = async (req: Request, res: Response): Promise<Response> => {
  const token = req.headers.authorization;
  const id: number = parseInt(res.locals.token.id);

  const profile: TUserResponse = await readProfileServices(id);

  return res.status(200).json(profile);
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const token = req.headers.authorization;
  const payload: TUserUpdateRequest = req.body;
  const id: number = parseInt(req.params.id);

  const userUpdate: TUserResponse = await updateUserServices(payload, id);

  return res.status(200).json(userUpdate);
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const token = req.headers.authorization;
  const id: number = parseInt(req.params.id);

  await deleteUserServices(id);

  return res.status(204).send();
};

const recoverUser = async (req: Request, res: Response): Promise<Response> => {
  const token = req.headers.authorization;
  const id: number = parseInt(req.params.id);

  const user = await recoverUserServices(id);

  return res.status(204).send(user);
};

export {
  createUser,
  listAllUsers,
  readProfile,
  updateUser,
  deleteUser,
  recoverUser,
};
