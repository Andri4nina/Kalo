import { clampPreamp, normalizeGains } from "./eq";
import { normalizeEffects, type EffectState } from "./effects";

export interface StudioPreset {
  id: string;
  label: string;
  gains: number[];
  preamp: number;
  effects: EffectState;
}

export const MAX_CUSTOM_PRESETS = 20;
const MAX_LABEL = 40;

export function createPreset(label: string, gains: number[], preamp: number, effects: EffectState): StudioPreset | null {
  const name = label.trim().slice(0, MAX_LABEL);
  if (!name) return null;
  const suffix = Math.round(Math.random() * 1_000_000).toString(36);
  return { id: `custom-${Date.now().toString(36)}-${suffix}`, label: name, gains: normalizeGains(gains), preamp: clampPreamp(preamp), effects: normalizeEffects(effects) };
}

export function normalizePresets(value: unknown): StudioPreset[] {
  if (!Array.isArray(value)) return [];
  const presets: StudioPreset[] = [];
  for (const item of value) {
    if (presets.length >= MAX_CUSTOM_PRESETS) break;
    const candidate = item as Partial<StudioPreset> | null;
    if (!candidate || typeof candidate.id !== "string" || typeof candidate.label !== "string") continue;
    presets.push({
      id: candidate.id,
      label: candidate.label.slice(0, MAX_LABEL),
      gains: normalizeGains(candidate.gains),
      preamp: typeof candidate.preamp === "number" ? clampPreamp(candidate.preamp) : 0,
      effects: normalizeEffects(candidate.effects),
    });
  }
  return presets;
}
