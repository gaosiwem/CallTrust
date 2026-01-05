import { RiskLevel, ScoringInput } from "./scoring.types";

export function calculateRiskScore(input: ScoringInput): {
  score: number;
  riskLevel: RiskLevel;
} {
  let score = 0;

  score += input.spamReports * 15;

  if (!input.hasConsent) {
    score += 25;
  }

  if (input.callAttemptsLast24h > 3) {
    score += (input.callAttemptsLast24h - 3) * 10;
  }

  let riskLevel: RiskLevel = "LOW";

  if (score >= 60) riskLevel = "HIGH";
  else if (score >= 30) riskLevel = "MEDIUM";

  return { score, riskLevel };
}
