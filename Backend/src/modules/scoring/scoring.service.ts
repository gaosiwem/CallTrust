import prisma from "../../prismaClient";
import dayjs from "dayjs";
import { requestMLScore } from "./ml.client";

export async function scoreCaller(
  userId: string,
  callerNumber: string,
  spamReports: number,
  hasConsent: boolean
) {
  const since = dayjs().subtract(24, "hour").toDate();

  const attempts = await prisma.callLog.count({
    where: {
      callerNumber,
      createdAt: { gte: since },
    },
  });

  const mlResult = await requestMLScore({
    spamReports,
    hasConsent,
    callAttempts24h: attempts,
  });

  await prisma.callScore.create({
    data: {
      callerNumber,
      score: mlResult.score,
      riskLevel: mlResult.risk_level,
    },
  });

  return {
    score: mlResult.score,
    riskLevel: mlResult.risk_level,
  };
}
