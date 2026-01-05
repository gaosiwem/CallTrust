export type DisputeStatus = "OPEN" | "UNDER_REVIEW" | "RESOLVED" | "REJECTED";

export interface DisputePayload {
  businessId: string;
  reason: string;
  callEventId?: string;
}
