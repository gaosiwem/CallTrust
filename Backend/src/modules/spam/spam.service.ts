import prisma from "../../prismaClient";

export async function reportSpam(
  reporterId: string,
  callerNumber: string,
  reason: string
) {
  return prisma.spamReport.create({
    data: { reporterId, callerNumber, reason },
  });
}

export async function spamReportCount(callerNumber: string): Promise<number> {
  return prisma.spamReport.count({
    where: { callerNumber },
  });
}
