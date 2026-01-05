import axios from "axios";

const ML_URL = process.env.ML_SERVICE_URL || "http://ai-service:8000";

export async function requestMLScore(payload: {
  spamReports: number;
  hasConsent: boolean;
  callAttempts24h: number;
}) {
  const response = await axios.post(`${ML_URL}/score`, {
    spam_reports: payload.spamReports,
    has_consent: payload.hasConsent,
    call_attempts_24h: payload.callAttempts24h,
  });

  return response.data;
}
