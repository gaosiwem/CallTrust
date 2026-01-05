export interface ConsentRecord {
  userId: string;
  consentType: "CALL_SCREENING" | "DATA_PROCESSING";
  granted: boolean;
  timestamp: Date;
}

export interface AuditEvent {
  actorId: string;
  action: string;
  entity: string;
  metadata?: Record<string, any>;
}
