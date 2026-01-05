import prisma from "../../prismaClient";
import { calculateSpamScore } from "./spamScoring.engine";

export async function getSpamInsight(businessId: string) {
  const metrics = await prisma.callMetrics.findUnique({
    where: { businessId },
  });

  if (!metrics) return null;

  return calculateSpamScore({
    callFrequency: metrics.callsLastHour,
    uniqueUsersCalled: metrics.uniqueUsers,
    spamReports: metrics.spamReports,
    repeatToSameUser: metrics.repeatCallsSameUser,
    timeWindowMinutes: 60,
  });
}
