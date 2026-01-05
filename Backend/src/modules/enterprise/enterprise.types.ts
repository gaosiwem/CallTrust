export type SlaTier = "FREE" | "PRO" | "ENTERPRISE";

export interface EnterpriseAccount {
  businessId: string;
  slaTier: SlaTier;
  webhookUrl?: string;
  rateLimitPerMinute: number;
}
