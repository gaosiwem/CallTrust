import { api } from "../api";

export async function fetchSubscription(token: string) {
  // Note: In a production app, the baseURL should be configured globally
  const res = await api.get("/subscription", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
