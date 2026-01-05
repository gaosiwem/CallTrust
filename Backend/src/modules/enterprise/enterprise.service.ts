import prisma from "../../prismaClient";
import { SlaTier } from "./enterprise.types";

export async function getEnterpriseAccount(businessId: string) {
  return prisma.enterpriseAccount.findUnique({
    where: { businessId },
  });
}

export async function createOrUpdateEnterprise(
  businessId: string,
  slaTier: SlaTier,
  webhookUrl?: string
) {
  const limits: Record<SlaTier, number> = {
    FREE: 30,
    PRO: 300,
    ENTERPRISE: 3000,
  };

  return prisma.enterpriseAccount.upsert({
    where: { businessId },
    update: {
      slaTier,
      webhookUrl,
      rateLimitPerMinute: limits[slaTier],
    },
    create: {
      businessId,
      slaTier,
      webhookUrl,
      rateLimitPerMinute: limits[slaTier],
    },
  });
}
