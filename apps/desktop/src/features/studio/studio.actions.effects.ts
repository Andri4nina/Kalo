import { DEFAULT_EFFECTS, clampMix, type EffectName } from "./effects";
import { saveStoredStudio } from "./studio.storage";
import type { StudioSet } from "./studio.store.types";

export function createEffectActions(set: StudioSet) {
  return {
    setEffect: (name: EffectName, value: number) =>
      set((state) => {
        const effects = { ...state.effects, [name]: clampMix(value) };
        saveStoredStudio({ ...state, effects });
        return { effects };
      }),
    resetEffects: () =>
      set((state) => {
        const effects = { ...DEFAULT_EFFECTS };
        saveStoredStudio({ ...state, effects });
        return { effects };
      }),
  };
}
