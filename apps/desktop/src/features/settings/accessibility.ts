import { create } from "zustand";

const KEY = "kalo:reduce-motion";

function initialReduceMotion(): boolean {
  const stored = localStorage.getItem(KEY);
  if (stored !== null) return stored === "true";
  const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  return query?.matches === true;
}

interface AccessibilityState {
  reduceMotion: boolean;
  toggle: () => void;
}

export const useAccessibility = create<AccessibilityState>((set) => ({
  reduceMotion: initialReduceMotion(),
  toggle: () =>
    set((state) => {
      const reduceMotion = !state.reduceMotion;
      localStorage.setItem(KEY, String(reduceMotion));
      return { reduceMotion };
    }),
}));

export function applyAccessibility(reduceMotion: boolean): void {
  document.documentElement.dataset.reduceMotion = reduceMotion ? "true" : "false";
}
