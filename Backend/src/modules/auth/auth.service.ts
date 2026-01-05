import prisma from "../../prismaClient";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env";

export async function login(phoneNumber: string) {
  let user = await prisma.user.findUnique({ where: { phoneNumber } });

  if (!user) {
    user = await prisma.user.create({ data: { phoneNumber } });
  }

  const token = jwt.sign({ userId: user.id }, ENV.JWT_SECRET);
  return { token };
}
