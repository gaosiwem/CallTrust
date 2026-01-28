import prisma from "../../prismaClient";

export async function logIncomingCall(
  callerNumber: string,
  receiverId: string
) {
  return prisma.callLog.create({
    data: { callerNumber, receiverId },
  });
}

export async function getCallLogs(receiverId: string) {
  return prisma.callLog.findMany({
    where: { receiverId },
    orderBy: { createdAt: "desc" },
  });
}
