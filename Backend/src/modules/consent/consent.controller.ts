import { Request, Response } from "express";
import { grantConsent, revokeConsent } from "./consent.service";

// Extend Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Using any for now, should be typed properly based on auth middleware
    }
  }
}

export async function grant(req: Request, res: Response) {
  const { callerNumber } = req.body;
  // Assuming req.user is populated by auth middleware
  await grantConsent(req.user.userId, callerNumber);
  res.json({ granted: true });
}

export async function revoke(req: Request, res: Response) {
  const { callerNumber } = req.body;
  await revokeConsent(req.user.userId, callerNumber);
  res.json({ revoked: true });
}
