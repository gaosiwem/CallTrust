export interface SpamScoreInput {
  callFrequency: number;
  uniqueUsersCalled: number;
  spamReports: number;
  repeatToSameUser: number;
  timeWindowMinutes: number;
}

export interface SpamScoreResult {
  score: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}
