import prisma from "../../prismaClient";
import { AnalyticsSummary } from "./analytics.types";

export async function getBusinessAnalytics(
  businessId: string
): Promise<AnalyticsSummary> {
  const calls = await prisma.callEvent.findMany({
    where: { businessId },
  });

  const reputation = await prisma.business.findUnique({
    where: { id: businessId },
    select: { trustScore: true },
  });

  return {
    totalCalls: calls.length,
    blockedCalls: calls.filter((c) => c.outcome === "BLOCKED").length,
    warningCalls: calls.filter((c) => c.outcome === "WARNED").length,
    trustScore: reputation?.trustScore ?? 0,
  };
}
