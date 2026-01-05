import { Request, Response } from "express";
import { createStripeSession, handleSubscription } from "./payments.service";

export async function startSubscription(req: Request, res: Response) {
  const { userId, plan } = req.body;
  const session = await createStripeSession(userId, plan);
  res.json({ sessionId: session.id });
}

export async function confirmSubscription(req: Request, res: Response) {
  const { userId, plan, durationMonths } = req.body;
  const subscription = await handleSubscription(userId, plan, durationMonths);
  res.json(subscription);
}
