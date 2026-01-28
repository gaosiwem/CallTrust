import { Request, Response } from "express";
import { SubscriptionService } from "./subscription.service";

export async function getSubscription(req: Request, res: Response) {
  try {
    // In a real app, userId would come from auth middleware: req.user.id
    // For now, we might need to get it from params or body if middleware isn't set up for this specific route
    const userId =
      (req as any).user?.id || req.query.userId || req.params.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const sub = await SubscriptionService.getActiveSubscription(
      userId as string
    );
    res.json(sub);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
