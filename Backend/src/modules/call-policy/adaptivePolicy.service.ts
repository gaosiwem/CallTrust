import prisma from "../../prismaClient";
import { calculateSpamScore } from "../spam-ml/spamScoring.engine";

export async function evaluateCallPolicy(businessId: string) {
  const metrics = await prisma.callMetrics.findUnique({
    where: { businessId },
  });

  if (!metrics) return { allowCall: true };

  const result = calculateSpamScore({
    callFrequency: metrics.callsLastHour,
    uniqueUsersCalled: metrics.uniqueUsers,
    spamReports: metrics.spamReports,
    repeatToSameUser: metrics.repeatCallsSameUser,
    timeWindowMinutes: 60,
  });

  if (result.riskLevel === "HIGH") {
    return { allowCall: false, reason: "High spam risk detected" };
  }

  if (result.riskLevel === "MEDIUM") {
    return { allowCall: true, warning: "Approaching spam threshold" };
  }

  return { allowCall: true };
}
