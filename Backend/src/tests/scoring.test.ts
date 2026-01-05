import { calculateRiskScore } from "../modules/scoring/scoring.engine";

it("assigns LOW risk correctly", () => {
  const result = calculateRiskScore({
    callerNumber: "0810000000",
    spamReports: 0,
    hasConsent: true,
    callAttemptsLast24h: 1,
  });

  expect(result.riskLevel).toBe("LOW");
});

it("assigns MEDIUM risk correctly", () => {
  const result = calculateRiskScore({
    callerNumber: "0810000001",
    spamReports: 2,
    hasConsent: false,
    callAttemptsLast24h: 2,
  });

  expect(result.riskLevel).toBe("MEDIUM");
});

it("assigns HIGH risk correctly", () => {
  const result = calculateRiskScore({
    callerNumber: "0810000002",
    spamReports: 4,
    hasConsent: false,
    callAttemptsLast24h: 6,
  });

  expect(result.riskLevel).toBe("HIGH");
});
