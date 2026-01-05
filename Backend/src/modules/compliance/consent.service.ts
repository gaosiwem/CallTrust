import prisma from "../../prismaClient";

export async function recordConsent(
  userId: string,
  consentType: string,
  granted: boolean
) {
  return prisma.userConsent.upsert({
    where: {
      userId_consentType: { userId, consentType },
    },
    update: {
      granted,
      updatedAt: new Date(),
    },
    create: {
      userId,
      consentType,
      granted,
    },
  });
}

export async function hasConsent(userId: string, consentType: string) {
  const consent = await prisma.userConsent.findUnique({
    where: {
      userId_consentType: { userId, consentType },
    },
  });
  return consent?.granted === true;
}
