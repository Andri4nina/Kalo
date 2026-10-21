import { MAX_CUSTOM_PRESETS, createPreset } from "./custom.presets";
import { saveStoredStudio } from "./studio.storage";
import type { StudioGet, StudioSet } from "./studio.store.types";

export function createPresetActions(set: StudioSet, get: StudioGet) {
  return {
    savePreset: (label: string): boolean => {
      const state = get();
      const preset = createPreset(label, state.gains, state.preamp, state.effects);
      if (!preset) return false;
      const customPresets = [preset, ...state.customPresets].slice(0, MAX_CUSTOM_PRESETS);
      saveStoredStudio({ ...state, customPresets });
      set({ customPresets, preset: preset.id });
      return true;
    },
    deletePreset: (id: string) =>
      set((state) => {
        const customPresets = state.customPresets.filter((preset) => preset.id !== id);
        saveStoredStudio({ ...state, customPresets });
        return { customPresets, preset: state.preset === id ? "custom" : state.preset };
      }),
    applyCustom: (id: string) =>
      set((state) => {
        const preset = state.customPresets.find((item) => item.id === id);
        if (!preset) return state;
        const gains = [...preset.gains];
        const effects = { ...preset.effects };
        saveStoredStudio({ ...state, enabled: true, preset: id, gains, preamp: preset.preamp, effects });
        return { enabled: true, preset: id, gains, preamp: preset.preamp, effects };
      }),
  };
}
