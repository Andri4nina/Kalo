import { clampPreamp, normalizeGains } from "./eq";

export interface EqState {
  enabled: boolean;
  preset: string;
  gains: number[];
  preamp: number;
}

export const EQ_FALLBACK: EqState = { enabled: false, preset: "flat", gains: normalizeGains(null), preamp: 0 };
const KEY = "kalo:studio-eq";

export function loadStudioState(): EqState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EQ_FALLBACK;
    const parsed = JSON.parse(raw) as Partial<EqState>;
    return {
      enabled: parsed.enabled === true,
      preset: typeof parsed.preset === "string" ? parsed.preset : EQ_FALLBACK.preset,
      gains: normalizeGains(parsed.gains),
      preamp: typeof parsed.preamp === "number" ? clampPreamp(parsed.preamp) : 0,
    };
  } catch {
    return EQ_FALLBACK;
  }
}

export function saveStudioState(state: EqState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Stockage local indisponible : l'égaliseur reste actif en mémoire.
  }
}
