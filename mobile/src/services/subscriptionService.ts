import { api } from "./api";

export async function getSubscription() {
  const res = await api.get("/payments/subscription");
  return res.data;
}

export async function startSubscription(plan: string) {
  const res = await api.post("/payments/start", { plan });
  return res.data.sessionId;
}
