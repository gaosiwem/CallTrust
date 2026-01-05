import { Request, Response } from "express";
import { recordConsent } from "./consent.service";

export async function updateConsent(req: Request, res: Response) {
  const { consentType, granted } = req.body;
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    return res.status(400).json({ error: "Missing user context" });
  }

  await recordConsent(userId, consentType, granted);
  res.json({ status: "updated" });
}
