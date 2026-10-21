import { create } from "zustand";
import { createCompareActions } from "./studio.actions.compare";
import { createCoreActions } from "./studio.actions.core";
import { createEffectActions } from "./studio.actions.effects";
import { createPresetActions } from "./studio.actions.presets";
import { loadStoredStudio } from "./studio.storage";
import type { StudioState } from "./studio.types";

export const useStudio = create<StudioState>((set, get) => ({
  ...loadStoredStudio(),
  compare: false,
  compareSnapshot: null,
  ...createCoreActions(set),
  ...createEffectActions(set),
  ...createPresetActions(set, get),
  ...createCompareActions(set),
}));
