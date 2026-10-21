export const BANDS = [31, 62, 125, 250, 500, 1_000, 2_000, 4_000, 8_000, 16_000] as const;
export const BAND_LABELS = ["31", "62", "125", "250", "500", "1 k", "2 k", "4 k", "8 k", "16 k"];
export const MIN_GAIN = -12;
export const MAX_GAIN = 12;
export const MIN_PREAMP = -12;
export const MAX_PREAMP = 12;

export interface Preset {
  id: string;
  label: string;
  gains: number[];
}

export const PRESETS: Preset[] = [
  { id: "flat", label: "Plat", gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: "bass", label: "Graves", gains: [6, 5, 4, 2, 0, 0, -1, -1, 0, 0] },
  { id: "voice", label: "Voix", gains: [-2, -1, 0, 2, 4, 4, 3, 1, 0, -1] },
  { id: "rock", label: "Rock", gains: [5, 4, 2, -1, -2, 0, 2, 3, 4, 3] },
  { id: "podcast", label: "Podcast", gains: [-6, -4, -1, 2, 4, 3, 1, 0, -1, -2] },
];

export function clampGain(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(MAX_GAIN, Math.max(MIN_GAIN, Math.round(value * 2) / 2));
}

export function clampPreamp(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(MAX_PREAMP, Math.max(MIN_PREAMP, Math.round(value * 2) / 2));
}

export function preampGain(value: number): number {
  return 10 ** (clampPreamp(value) / 20);
}

export function normalizeGains(value: unknown): number[] {
  const source = Array.isArray(value) ? value : [];
  return BANDS.map((_, index) => {
    const gain = source[index];
    return typeof gain === "number" ? clampGain(gain) : 0;
  });
}

export function presetGains(id: string): number[] | null {
  const preset = PRESETS.find((item) => item.id === id);
  return preset ? [...preset.gains] : null;
}

export function applyEq(filters: BiquadFilterNode[], gains: number[], enabled: boolean): void {
  filters.forEach((filter, index) => {
    const value = enabled ? (gains[index] ?? 0) : 0;
    if (filter.gain.setTargetAtTime) {
      filter.gain.setTargetAtTime(value, filter.context.currentTime, 0.02);
    } else {
      filter.gain.value = value;
    }
  });
}
