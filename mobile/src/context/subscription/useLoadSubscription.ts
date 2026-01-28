import { useEffect } from "react";
import { fetchSubscription } from "../../services/subscription/subscription.api";
import { useSubscriptionStore } from "./subscription.store";
import CallNative from "../../native/CallNative";

export function useLoadSubscription(token: string) {
  const setTier = useSubscriptionStore((s) => s.setTier);

  useEffect(() => {
    if (!token) return;
    fetchSubscription(token)
      .then((sub) => {
        setTier(sub.tier);
        CallNative.setTier(sub.tier);
      })
      .catch((err) => console.error("Failed to load subscription", err));
  }, [token, setTier]);
}
