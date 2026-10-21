import { clampGain, clampPreamp, presetGains } from "./eq";
import { saveStoredStudio, STUDIO_FALLBACK } from "./studio.storage";
import type { StudioSet } from "./studio.store.types";

export function createCoreActions(set: StudioSet) {
  return {
    setEnabled: (enabled: boolean) =>
      set((state) => {
        saveStoredStudio({ ...state, enabled });
        return { enabled, compare: false, compareSnapshot: null };
      }),
    applyPreset: (id: string) =>
      set((state) => {
        const gains = presetGains(id);
        if (!gains) return state;
        saveStoredStudio({ ...state, enabled: true, preset: id, gains });
        return { enabled: true, preset: id, gains };
      }),
    setBand: (index: number, gain: number) =>
      set((state) => {
        if (index < 0 || index >= state.gains.length) return state;
        const gains = state.gains.map((value, position) => (position === index ? clampGain(gain) : value));
        saveStoredStudio({ ...state, preset: "custom", gains });
        return { preset: "custom", gains };
      }),
    setPreamp: (value: number) =>
      set((state) => {
        const preamp = clampPreamp(value);
        saveStoredStudio({ ...state, preamp });
        return { preamp };
      }),
    reset: () =>
      set((state) => {
        const gains = [...STUDIO_FALLBACK.gains];
        saveStoredStudio({ ...state, preset: "flat", gains, preamp: STUDIO_FALLBACK.preamp });
        return { preset: "flat", gains, preamp: STUDIO_FALLBACK.preamp };
      }),
  };
}
