import prisma from "../../prismaClient";
import { DisputePayload } from "./dispute.types";

export async function createDispute(payload: DisputePayload) {
  return prisma.dispute.create({
    data: {
      businessId: payload.businessId,
      reason: payload.reason,
      callEventId: payload.callEventId,
      status: "OPEN",
    },
  });
}

export async function resolveDispute(disputeId: string, approved: boolean) {
  const status = approved ? "RESOLVED" : "REJECTED";

  const dispute = await prisma.dispute.update({
    where: { id: disputeId },
    data: { status },
  });

  if (approved) {
    await prisma.business.update({
      where: { id: dispute.businessId },
      data: {
        trustScore: { increment: 5 },
      },
    });
  }

  return dispute;
}

export async function getDisputesForBusiness(businessId: string) {
  return prisma.dispute.findMany({
    where: { businessId },
  });
}
