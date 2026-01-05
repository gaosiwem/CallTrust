import { canBusinessCall } from "../modules/business/business.policy";

it("blocks unverified business", () => {
  const result = canBusinessCall(false, 80);
  expect(result.allowed).toBe(false);
});

it("blocks low trust business", () => {
  const result = canBusinessCall(true, 10);
  expect(result.allowed).toBe(false);
});

it("allows verified trusted business", () => {
  const result = canBusinessCall(true, 60);
  expect(result.allowed).toBe(true);
});
