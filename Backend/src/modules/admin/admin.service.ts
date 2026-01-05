import prisma from "../../prismaClient";
import { evaluateBusinessAbuse } from "./abuse.policy";

export async function handleAbuse(callerNumber: string) {
  const action = await evaluateBusinessAbuse(callerNumber);

  if (action === "TEMP_BLOCK") {
    await prisma.businessCaller.updateMany({
      where: { phoneNumber: callerNumber },
      data: { active: false },
    });
  }

  if (action === "PERM_BLOCK") {
    await prisma.businessCaller.updateMany({
      where: { phoneNumber: callerNumber },
      data: { active: false },
    });
    // Optionally notify admin or log permanently blocked business
  }

  return action;
}
