import { Request, Response } from "express";
import { handleAbuse } from "./admin.service";

export async function checkBusinessAbuse(req: Request, res: Response) {
  const { phoneNumber } = req.body;
  const action = await handleAbuse(phoneNumber);
  res.json({ action });
}
