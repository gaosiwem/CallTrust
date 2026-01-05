import { calculateSpamScore } from "../modules/spam-ml/spamScoring.engine";

it("returns high risk for excessive spam behavior", () => {
  const result = calculateSpamScore({
    callFrequency: 20,
    uniqueUsersCalled: 15,
    spamReports: 6,
    repeatToSameUser: 5,
    timeWindowMinutes: 30,
  });

  expect(result.riskLevel).toBe("HIGH");
});

it("returns low risk for normal behavior", () => {
  const result = calculateSpamScore({
    callFrequency: 1,
    uniqueUsersCalled: 1,
    spamReports: 0,
    repeatToSameUser: 0,
    timeWindowMinutes: 60,
  });

  expect(result.riskLevel).toBe("LOW");
});
