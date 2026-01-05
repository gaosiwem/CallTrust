export type CallOutcome = "ALLOWED" | "BLOCKED" | "WARNED";

export interface AnalyticsSummary {
  totalCalls: number;
  blockedCalls: number;
  warningCalls: number;
  trustScore: number;
}
