import { Request, Response, NextFunction } from "express";
import { getEnterpriseAccount } from "./enterprise.service";

const rateCache = new Map<string, { count: number; timestamp: number }>();

export async function slaGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const businessId = req.headers["x-business-id"] as string;
  if (!businessId) return res.status(400).end();

  const account = await getEnterpriseAccount(businessId);
  if (!account) return res.status(403).end();

  const now = Date.now();
  const windowMs = 60_000;
  const entry = rateCache.get(businessId) || { count: 0, timestamp: now };

  if (now - entry.timestamp > windowMs) {
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count += 1;
  rateCache.set(businessId, entry);

  if (entry.count > account.rateLimitPerMinute) {
    return res.status(429).json({ error: "SLA rate limit exceeded" });
  }

  next();
}
