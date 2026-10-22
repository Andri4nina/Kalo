import { create } from "zustand";
import { clampFreq, clampQ, DEFAULT_SHAPE, normalizeShape, type BandShape } from "./eq.shape";

const KEY = "kalo:studio-bands";

function load(): BandShape[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? normalizeShape(JSON.parse(raw)) : DEFAULT_SHAPE;
  } catch {
    return DEFAULT_SHAPE;
  }
}

function persist(bands: BandShape[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(bands));
  } catch {
    // Stockage indisponible : le réglage vaut pour la session.
  }
}

interface ShapeState {
  bands: BandShape[];
  setBand: (index: number, patch: Partial<BandShape>) => void;
  reset: () => void;
}

/** Mode paramétrique : fréquence et largeur de chaque bande, mémorisées localement. */
export const useEqShape = create<ShapeState>((set) => ({
  bands: load(),
  setBand: (index, patch) =>
    set((state) => {
      const bands = state.bands.map((band, position) =>
        position === index
          ? { freq: clampFreq(patch.freq ?? band.freq, band.freq), q: clampQ(patch.q ?? band.q) }
          : band,
      );
      persist(bands);
      return { bands };
    }),
  reset: () => {
    persist(DEFAULT_SHAPE);
    set({ bands: DEFAULT_SHAPE });
  },
}));
