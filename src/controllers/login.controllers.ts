import { Request, Response } from "express";
import { TLoginRequest } from "../interfaces/login.interfaces";
import { createLoginServices } from "../services/login/createLogin.services";

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: TLoginRequest = req.body;

  const token = await createLoginServices(payload);

  return res.status(200).json({ token });
};

export { loginUser };
