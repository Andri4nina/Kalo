import { saveStoredStudio } from "./studio.storage";
import type { StudioSnapshot } from "./studio.types";
import type { StudioSet } from "./studio.store.types";

export function createCompareActions(set: StudioSet) {
  return {
    toggleCompare: () =>
      set((state) => {
        if (state.compareSnapshot) {
          const snapshot = state.compareSnapshot;
          saveStoredStudio({ ...state, ...snapshot });
          return { ...snapshot, compare: false, compareSnapshot: null };
        }
        const compareSnapshot: StudioSnapshot = {
          enabled: state.enabled,
          preset: state.preset,
          gains: [...state.gains],
          preamp: state.preamp,
          effects: { ...state.effects },
        };
        saveStoredStudio({ ...state, enabled: false });
        return { enabled: false, compare: true, compareSnapshot };
      }),
  };
}
