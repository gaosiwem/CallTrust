import { Request, Response } from "express";
import { logIncomingCall, getCallLogs } from "./call.service";

export async function intakeCall(req: Request, res: Response) {
  const { callerNumber, receiverId } = req.body;
  await logIncomingCall(callerNumber, receiverId);
  res.json({ accepted: true });
}

export async function getHistory(req: Request, res: Response) {
  const { receiverId } = req.params;
  const logs = await getCallLogs(receiverId);
  res.json(logs);
}
