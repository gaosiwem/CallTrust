import prisma from "../../prismaClient";

export async function applyReputationChange(
  caller: string,
  delta: number,
  reason: string
) {
  await prisma.reputationEvent.create({
    data: { caller, delta, reason },
  });

  const businessCaller = await prisma.businessCaller.findUnique({
    where: { phoneNumber: caller },
    include: { Business: true },
  });

  if (!businessCaller) return;

  await prisma.business.update({
    where: { id: businessCaller.businessId },
    data: {
      trustScore: {
        increment: delta,
      },
    },
  });
}
