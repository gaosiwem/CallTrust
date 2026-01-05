import prisma from "../../prismaClient";

export async function evaluateBusinessAbuse(callerNumber: string) {
  const events = await prisma.reputationEvent.findMany({
    where: { caller: callerNumber },
  });

  const spamReports = events.filter((e) => e.reason === "SPAM_REPORT").length;

  if (spamReports >= 5 && spamReports < 10) {
    return "TEMP_BLOCK"; // Temporarily block this caller
  }

  if (spamReports >= 10) {
    return "PERM_BLOCK"; // Permanently block this caller
  }

  return "WARN_BUSINESS"; // Warn if under threshold
}
