import { api } from "./api";

export async function fetchEnterpriseStatus(businessId: string) {
  const res = await api.get(`/enterprise/status/${businessId}`);
  return res.data;
}
