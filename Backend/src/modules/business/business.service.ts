import prisma from "../../prismaClient";

export async function registerBusiness(name: string, registrationNo: string) {
  return prisma.business.create({
    data: { name, registrationNo },
  });
}

export async function verifyBusiness(businessId: string) {
  return prisma.business.update({
    where: { id: businessId },
    data: { verified: true },
  });
}

export async function findBusinessByCaller(phoneNumber: string) {
  return prisma.businessCaller.findUnique({
    where: { phoneNumber },
    include: { Business: true },
  });
}
