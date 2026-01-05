import { Request, Response } from "express";
import { login } from "./auth.service";

export async function loginController(req: Request, res: Response) {
  const { phoneNumber } = req.body;
  const result = await login(phoneNumber);
  res.json(result);
}
