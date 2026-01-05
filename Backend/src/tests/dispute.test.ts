import { createDispute } from "../modules/disputes/dispute.service";

it("creates a dispute record", async () => {
  const businessId = "biz-test-" + Math.random();
  const dispute = await createDispute({
    businessId: businessId,
    reason: "Incorrect spam classification",
  });

  expect(dispute.status).toBe("OPEN");
  expect(dispute.businessId).toBe(businessId);
});
