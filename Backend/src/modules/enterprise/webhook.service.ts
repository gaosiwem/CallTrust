import axios from "axios";

export async function sendWebhook(url: string, payload: Record<string, any>) {
  try {
    await axios.post(url, payload, {
      timeout: 3000,
    });
  } catch {
    return;
  }
}
