import { create } from "zustand";

type AuthState = {
  user: string | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem("user"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: (email) => {
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", email);
    set({ user: email, isAuthenticated: true });
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, isAuthenticated: false });
  },
}));
