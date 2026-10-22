import { BANDS } from "./eq";

/** Forme d'une bande : fréquence centrale (Hz) et largeur (facteur Q). */
export interface BandShape {
  freq: number;
  q: number;
}

export const MIN_FREQ = 20;
export const MAX_FREQ = 20_000;
export const MIN_Q = 0.3;
export const MAX_Q = 8;
export const DEFAULT_Q = 1.1;

export const DEFAULT_SHAPE: BandShape[] = BANDS.map((freq) => ({ freq, q: DEFAULT_Q }));

const clamp = (value: number, min: number, max: number, fallback: number) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : fallback;

export const clampFreq = (value: number, fallback: number) => Math.round(clamp(value, MIN_FREQ, MAX_FREQ, fallback));

export const clampQ = (value: number) => Math.round(clamp(value, MIN_Q, MAX_Q, DEFAULT_Q) * 10) / 10;

/** Valeurs stockées validées ; toute entrée invalide revient au réglage d'usine. */
export function normalizeShape(value: unknown): BandShape[] {
  const source = Array.isArray(value) ? value : [];
  return DEFAULT_SHAPE.map((band, index) => {
    const item = source[index] as Partial<BandShape> | undefined;
    return {
      freq: typeof item?.freq === "number" ? clampFreq(item.freq, band.freq) : band.freq,
      q: typeof item?.q === "number" ? clampQ(item.q) : band.q,
    };
  });
}

export function applyShape(filters: BiquadFilterNode[], shape: BandShape[]): void {
  filters.forEach((filter, index) => {
    const band = shape[index];
    if (!band) return;
    filter.frequency.value = band.freq;
    filter.Q.value = band.q;
  });
}
