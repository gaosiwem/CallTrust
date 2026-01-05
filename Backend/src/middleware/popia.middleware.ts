import { Request, Response, NextFunction } from "express";
import { hasConsent } from "../modules/compliance/consent.service";

export async function popiaGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    return res.status(400).json({ error: "Missing user context" });
  }

  const allowed = await hasConsent(userId, "DATA_PROCESSING");

  if (!allowed) {
    return res.status(403).json({
      error: "Consent required under POPIA",
    });
  }

  next();
}
