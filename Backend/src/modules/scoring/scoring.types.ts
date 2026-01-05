export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface ScoringInput {
  callerNumber: string;
  spamReports: number;
  hasConsent: boolean;
  callAttemptsLast24h: number;
}
