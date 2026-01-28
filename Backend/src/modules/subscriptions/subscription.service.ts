import prisma from "../../prismaClient";
import { Subscription } from "./subscription.types";

export class SubscriptionService {
  static async getActiveSubscription(userId: string): Promise<Subscription> {
    const sub = await prisma.subscription.findFirst({
      where: { userId, active: true },
      orderBy: { createdAt: "desc" },
    });

    if (!sub || (sub.endDate && new Date(sub.endDate) < new Date())) {
      return { userId, tier: "FREE", active: false, expiresAt: null };
    }

    return {
      userId: sub.userId,
      tier: sub.plan,
      active: sub.active,
      expiresAt: sub.endDate,
    };
  }
}
