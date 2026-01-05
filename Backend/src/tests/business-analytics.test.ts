import { getBusinessAnalytics } from "../modules/business-analytics/analytics.service";

it("returns analytics summary without throwing", async () => {
  // Mock data/database might be needed for a robust test,
  // but for now we follow the sprint spec which implies a basic sanity test.
  // We'll use a nonexistent ID which should return 0s instead of throwing.
  const summary = await getBusinessAnalytics("nonexistent-business-id");
  expect(summary).toHaveProperty("totalCalls");
  expect(summary).toHaveProperty("trustScore");
  expect(summary.totalCalls).toBe(0);
  expect(summary.trustScore).toBe(0);
});
