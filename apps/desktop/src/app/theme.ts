import { create } from "zustand";

export type Theme = "dark" | "light";

function initialTheme(): Theme {
  return localStorage.getItem("kalo:theme") === "light" ? "light" : "dark";
}

interface ThemeState {
  theme: Theme;
  toggle: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
  theme: initialTheme(),
  toggle: () =>
    set((state) => {
      const theme: Theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("kalo:theme", theme);
      return { theme };
    }),
}));

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
