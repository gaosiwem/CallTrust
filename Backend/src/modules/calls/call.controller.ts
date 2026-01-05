import { Request, Response } from "express";
import { logIncomingCall } from "./call.service";

export async function intakeCall(req: Request, res: Response) {
  const { callerNumber, receiverId } = req.body;
  await logIncomingCall(callerNumber, receiverId);
  res.json({ accepted: true });
}
