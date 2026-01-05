import { create } from "zustand";

type AuthState = {
  userId: string | null;
  token: string | null;
  setAuth: (id: string, token: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  token: null,
  setAuth: (id, token) => {
    // @ts-ignore
    globalThis.AUTH_TOKEN = token;
    set({ userId: id, token });
  },
}));
