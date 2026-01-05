export function canBusinessCall(verified: boolean, trustScore: number) {
  if (!verified) {
    return { allowed: false, reason: "BUSINESS_NOT_VERIFIED" };
  }

  if (trustScore < 20) {
    return { allowed: false, reason: "LOW_TRUST_SCORE" };
  }

  return { allowed: true };
}
