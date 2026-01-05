import { isFeatureAccessible } from "../modules/payments/subscription.policy";
import { handleSubscription } from "../modules/payments/payments.service";
import prisma from "../prismaClient";

jest.setTimeout(15000);

it("checks feature accessibility for free users", async () => {
  const accessible = await isFeatureAccessible(
    "nonexistent-user",
    "CALL_BLOCK"
  );
  expect(accessible).toBe(false);
});

it("creates subscription without error", async () => {
  await expect(
    handleSubscription("user123", "BASIC", 1)
  ).resolves.not.toThrow();

  const accessible = await isFeatureAccessible("user123", "CALL_BLOCK");
  expect(accessible).toBe(true);
});
