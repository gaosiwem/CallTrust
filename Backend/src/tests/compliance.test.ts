import {
  recordConsent,
  hasConsent,
} from "../modules/compliance/consent.service";

it("stores and validates POPIA consent", async () => {
  const userId = "test-user-" + Math.random();
  await recordConsent(userId, "DATA_PROCESSING", true);
  const allowed = await hasConsent(userId, "DATA_PROCESSING");
  expect(allowed).toBe(true);
});

it("returns false if consent not granted", async () => {
  const userId = "test-user-" + Math.random();
  await recordConsent(userId, "DATA_PROCESSING", false);
  const allowed = await hasConsent(userId, "DATA_PROCESSING");
  expect(allowed).toBe(false);
});

it("returns false if no record exists", async () => {
  const userId = "test-user-" + Math.random();
  const allowed = await hasConsent(userId, "DATA_PROCESSING");
  expect(allowed).toBe(false);
});
