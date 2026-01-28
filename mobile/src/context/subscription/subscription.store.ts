import { create } from "zustand";

export type Tier = "FREE" | "PRO" | "BUSINESS";

interface State {
  tier: Tier;
  setTier: (t: Tier) => void;
}

export const useSubscriptionStore = create<State>((set) => ({
  tier: "FREE",
  setTier: (tier) => set({ tier }),
}));
