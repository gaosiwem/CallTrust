import { api } from "./api";

export async function updateConsent(consentType: string, granted: boolean) {
  return api.post("/compliance/consent", {
    consentType,
    granted,
  });
}
