import { create } from "zustand";

const KEY = "kalo:watch-folders";

function initial(): boolean {
  try {
    return localStorage.getItem(KEY) !== "false";
  } catch {
    return true;
  }
}

interface WatchState {
  enabled: boolean;
  error: string | null;
  setEnabled: (enabled: boolean) => void;
  setError: (error: string | null) => void;
}

/** Surveillance des dossiers : activée par défaut, mémorisée sur l'appareil. */
export const useFolderWatchPrefs = create<WatchState>((set) => ({
  enabled: initial(),
  error: null,
  setEnabled: (enabled) => {
    try {
      localStorage.setItem(KEY, String(enabled));
    } catch {
      // Stockage indisponible : le réglage vaut pour la session.
    }
    set({ enabled, error: null });
  },
  setError: (error) => set({ error }),
}));
