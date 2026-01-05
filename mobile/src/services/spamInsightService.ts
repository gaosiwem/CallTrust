import { api } from "./api";

export async function fetchSpamInsight(businessId: string) {
  const res = await api.get(`/spam-insight/${businessId}`);
  return res.data;
}
