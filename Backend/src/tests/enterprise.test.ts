import { createOrUpdateEnterprise } from "../modules/enterprise/enterprise.service";

it("creates enterprise SLA account", async () => {
  const businessId = "biz-test-" + Math.random();
  const account = await createOrUpdateEnterprise(
    businessId,
    "ENTERPRISE",
    "https://example.com/webhook"
  );
  expect(account.rateLimitPerMinute).toBe(3000);
});

it("updates existing enterprise SLA account", async () => {
  const businessId = "biz-test-" + Math.random();
  await createOrUpdateEnterprise(businessId, "FREE");
  const account = await createOrUpdateEnterprise(businessId, "PRO");
  expect(account.rateLimitPerMinute).toBe(300);
});
