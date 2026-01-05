import prisma from "../../prismaClient";

export async function purgeExpiredData() {
  const retentionDays = 90;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - retentionDays);

  await prisma.callLog.deleteMany({
    where: {
      createdAt: { lt: cutoff },
    },
  });

  await prisma.auditLog.deleteMany({
    where: {
      createdAt: { lt: cutoff },
    },
  });
}
