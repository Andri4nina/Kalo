import { create } from "zustand";
import { clampGain, presetGains } from "./eq";
import { EQ_FALLBACK, loadStudioState, saveStudioState, type EqState } from "./studio.storage";

interface StudioActions {
  setEnabled: (enabled: boolean) => void;
  applyPreset: (id: string) => void;
  setBand: (index: number, gain: number) => void;
  reset: () => void;
}

export type StudioState = EqState & StudioActions;

export const useStudio = create<StudioState>((set) => ({
  ...loadStudioState(),
  setEnabled: (enabled) =>
    set((state) => {
      saveStudioState({ enabled, preset: state.preset, gains: state.gains });
      return { enabled };
    }),
  applyPreset: (id) =>
    set((state) => {
      const gains = presetGains(id);
      if (!gains) return state;
      saveStudioState({ enabled: true, preset: id, gains });
      return { enabled: true, preset: id, gains };
    }),
  setBand: (index, gain) =>
    set((state) => {
      if (index < 0 || index >= state.gains.length) return state;
      const gains = state.gains.map((value, position) => (position === index ? clampGain(gain) : value));
      saveStudioState({ enabled: state.enabled, preset: "custom", gains });
      return { preset: "custom", gains };
    }),
  reset: () =>
    set((state) => {
      const gains = [...EQ_FALLBACK.gains];
      saveStudioState({ enabled: state.enabled, preset: "flat", gains });
      return { preset: "flat", gains };
    }),
}));
