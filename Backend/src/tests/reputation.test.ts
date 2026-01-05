import { applyReputationChange } from "../modules/reputation/reputation.service";
import prisma from "../prismaClient";

jest.setTimeout(15000);

it("applies reputation change without error", async () => {
  // Create a business and caller first to test strictly
  const uniqueId = Date.now().toString();
  const business = await prisma.business.create({
    data: {
      name: `Test Corp ${uniqueId}`,
      registrationNo: uniqueId,
      trustScore: 50,
    },
  });
  await prisma.businessCaller.create({
    data: { businessId: business.id, phoneNumber: `081${uniqueId.slice(-7)}` },
  });

  await applyReputationChange(`081${uniqueId.slice(-7)}`, -10, "SPAM_REPORT");

  const updated = await prisma.business.findUnique({
    where: { id: business.id },
  });
  expect(updated?.trustScore).toBe(40);
});
