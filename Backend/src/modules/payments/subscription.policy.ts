import prisma from "../../prismaClient";

export async function isFeatureAccessible(userId: string, feature: string) {
  const subscription = await prisma.subscription.findFirst({
    where: { userId, active: true },
  });

  if (!subscription) return false;

  if (subscription.plan === "PREMIUM") return true;
  if (subscription.plan === "BASIC" && feature !== "ADVANCED_AI") return true;

  return false;
}
