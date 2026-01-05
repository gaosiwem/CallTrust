import { Request, Response } from "express";
import { reportSpam } from "./spam.service";

export async function report(req: Request, res: Response) {
  const { callerNumber, reason } = req.body;
  // Assuming req.user is populated by auth middleware
  await reportSpam(req.user.userId, callerNumber, reason);
  res.json({ reported: true });
}
