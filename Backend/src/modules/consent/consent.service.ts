import prisma from "../../prismaClient";

export async function hasActiveConsent(
  userId: string,
  callerNumber: string
): Promise<boolean> {
  const consent = await prisma.consent.findFirst({
    where: {
      userId,
      callerNumber,
      granted: true,
      revokedAt: null,
    },
  });

  return Boolean(consent);
}

export async function grantConsent(userId: string, callerNumber: string) {
  return prisma.consent.create({
    data: { userId, callerNumber },
  });
}

export async function revokeConsent(userId: string, callerNumber: string) {
  return prisma.consent.updateMany({
    where: { userId, callerNumber, revokedAt: null },
    data: { granted: false, revokedAt: new Date() },
  });
}
