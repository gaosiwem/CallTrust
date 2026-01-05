import { api } from "./api";

export async function evaluateIncomingCall(callerNumber: string) {
  const res = await api.post("/calls/evaluate", {
    callerNumber,
  });

  return res.data as {
    allow: boolean;
    reason?: string;
    label?: string;
  };
}
