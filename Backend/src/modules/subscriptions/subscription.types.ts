export type SubscriptionTier = "FREE" | "PRO" | "BUSINESS";

export interface Subscription {
  userId: string;
  tier: string;
  active: boolean;
  expiresAt: Date | null;
}
