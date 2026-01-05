import { SpamScoreInput, SpamScoreResult } from "./spamScoring.types";

export function calculateSpamScore(input: SpamScoreInput): SpamScoreResult {
  const frequencyWeight = 0.3;
  const reportWeight = 0.4;
  const repeatWeight = 0.2;
  const timeWeight = 0.1;

  const frequencyScore = Math.min(input.callFrequency / 10, 1);
  const reportScore = Math.min(input.spamReports / 5, 1);
  const repeatScore = Math.min(input.repeatToSameUser / 3, 1);
  const timeScore = Math.min(input.timeWindowMinutes / 60, 1);

  const score =
    frequencyScore * frequencyWeight +
    reportScore * reportWeight +
    repeatScore * repeatWeight +
    timeScore * timeWeight;

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW";
  if (score >= 0.7) riskLevel = "HIGH";
  else if (score >= 0.4) riskLevel = "MEDIUM";

  return { score: Math.round(score * 100), riskLevel };
}
