import { hasActiveConsent } from "../consent/consent.service";
import { spamReportCount } from "../spam/spam.service";
import { scoreCaller } from "../scoring/scoring.service";
import { findBusinessByCaller } from "../business/business.service";
import { canBusinessCall } from "../business/business.policy";

async function evaluateConsumerPolicy(userId: string, callerNumber: string) {
  const consent = await hasActiveConsent(userId, callerNumber);
  const spamCount = await spamReportCount(callerNumber);

  const score = await scoreCaller(userId, callerNumber, spamCount, consent);

  if (score.riskLevel === "HIGH") {
    return {
      allow: false,
      reason: "HIGH_RISK_CALL",
      score,
    };
  }

  return {
    allow: true,
    score,
  };
}

export async function evaluateIncomingCall(
  userId: string,
  callerNumber: string
) {
  const businessCaller = await findBusinessByCaller(callerNumber);

  if (businessCaller) {
    const decision = canBusinessCall(
      businessCaller.Business.verified,
      businessCaller.Business.trustScore
    );

    if (!decision.allowed) {
      return {
        allow: false,
        reason: decision.reason,
      };
    }
    // If allowed by business policy, we might still want to log/score or just allow.
    // Spec doesn't explicitly say to skip consumer check if business allowed, but usually business overrides.
    // However, the spec code snippet returns decision if !allowed, else...
    // The snippet:
    // if (!decision.allowed) return ...;
    // }
    // return evaluateCallPolicy(...)
    // This implies that even if business is OK, we proceed to evaluateCallPolicy (consumer).
    // Wait, if it's a verified business, do we still score it as spam?
    // "allows verified trusted business" test says expectation is true.
    // If I fall through to consumer policy, it might be blocked if it has spam reports?
    // But a verified business might have spam reports?
    // The spec code snippet clearly shows fallthrough:
    // if (businessCaller) { ... if (!allowed) return ... }
    // return evaluateCallPolicy(...)
    // So I will follow the snippet.
  }

  return evaluateConsumerPolicy(userId, callerNumber);
}

// Re-export for backward compatibility if needed, or alias
export const evaluateCallPolicy = evaluateIncomingCall;
