import { api } from "./api";

export async function submitDispute(data: {
  businessId: string;
  reason: string;
  callEventId?: string;
}) {
  return api.post("/disputes", data);
}

export async function fetchDisputes(businessId: string) {
  const res = await api.get(`/disputes/business/${businessId}`);
  return res.data;
}
