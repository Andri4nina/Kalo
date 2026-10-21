import type { StudioPreset } from "./custom.presets";
import type { EffectName, EffectState } from "./effects";

export interface StudioSnapshot {
  enabled: boolean;
  preset: string;
  gains: number[];
  preamp: number;
  effects: EffectState;
}

export interface StoredStudio extends StudioSnapshot {
  customPresets: StudioPreset[];
}

export interface StudioActions {
  setEnabled: (enabled: boolean) => void;
  applyPreset: (id: string) => void;
  setBand: (index: number, gain: number) => void;
  setPreamp: (value: number) => void;
  reset: () => void;
  setEffect: (name: EffectName, value: number) => void;
  resetEffects: () => void;
  savePreset: (label: string) => boolean;
  deletePreset: (id: string) => void;
  applyCustom: (id: string) => void;
  toggleCompare: () => void;
}

export type StudioState = StoredStudio & { compare: boolean; compareSnapshot: StudioSnapshot | null } & StudioActions;
