import { evaluateCallPolicy } from "../modules/calls/call.policy";
import prisma from "../prismaClient";
import * as mlClient from "../modules/scoring/ml.client";

jest.mock("../modules/scoring/ml.client");
jest.setTimeout(15000);

it("blocks when spam threshold exceeded and no consent", async () => {
  // Clear previous reports for this number to ensure clean state
  await prisma.spamReport.deleteMany({ where: { callerNumber: "0850000000" } });

  for (let i = 0; i < 5; i++) {
    await prisma.spamReport.create({
      data: {
        reporterId: `u${i}`,
        callerNumber: "0850000000",
        reason: "spam",
      },
    });
  }

  (mlClient.requestMLScore as jest.Mock).mockResolvedValue({
    score: 80,
    risk_level: "HIGH",
  });

  const result = await evaluateCallPolicy("userX", "0850000000");
  expect(result.allow).toBe(false);
});
