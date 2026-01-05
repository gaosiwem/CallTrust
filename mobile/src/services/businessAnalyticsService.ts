import { api } from "./api";

export async function fetchBusinessAnalytics(businessId: string) {
  const res = await api.get(`/business-analytics/${businessId}`);
  return res.data;
}
