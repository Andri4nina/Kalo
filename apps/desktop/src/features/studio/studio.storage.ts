import { normalizePresets } from "./custom.presets";
import { DEFAULT_EFFECTS, normalizeEffects } from "./effects";
import { clampPreamp, normalizeGains } from "./eq";
import type { StoredStudio } from "./studio.types";

export const STUDIO_FALLBACK: StoredStudio = {
  enabled: false,
  preset: "flat",
  gains: normalizeGains(null),
  preamp: 0,
  effects: { ...DEFAULT_EFFECTS },
  customPresets: [],
};

const KEY = "kalo:studio-eq";

export function loadStoredStudio(): StoredStudio {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return STUDIO_FALLBACK;
    const parsed = JSON.parse(raw) as Partial<StoredStudio>;
    return {
      enabled: parsed.enabled === true,
      preset: typeof parsed.preset === "string" ? parsed.preset : "flat",
      gains: normalizeGains(parsed.gains),
      preamp: typeof parsed.preamp === "number" ? clampPreamp(parsed.preamp) : 0,
      effects: normalizeEffects(parsed.effects),
      customPresets: normalizePresets(parsed.customPresets),
    };
  } catch {
    return STUDIO_FALLBACK;
  }
}

export function saveStoredStudio(state: StoredStudio): void {
  try {
    const payload: StoredStudio = {
      enabled: state.enabled,
      preset: state.preset,
      gains: state.gains,
      preamp: state.preamp,
      effects: state.effects,
      customPresets: state.customPresets,
    };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // Stockage local indisponible : les réglages restent actifs en mémoire.
  }
}
