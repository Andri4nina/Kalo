import { create } from "zustand";
import { DEFAULT_BINDINGS, SHORTCUTS, type ShortcutAction, type ShortcutBindings } from "./shortcuts";
import { loadBindings, saveBindings } from "./shortcut.storage";

interface ShortcutState {
  bindings: ShortcutBindings;
  assign: (action: ShortcutAction, code: string) => string | null;
  reset: () => void;
}

export const useShortcuts = create<ShortcutState>((set, get) => ({
  bindings: loadBindings(),
  assign: (action, code) => {
    const conflict = SHORTCUTS.find((item) => item.id !== action && get().bindings[item.id] === code);
    if (conflict) return `Déjà utilisé par « ${conflict.label} ».`;
    const bindings = { ...get().bindings, [action]: code };
    saveBindings(bindings);
    set({ bindings });
    return null;
  },
  reset: () => {
    const bindings = { ...DEFAULT_BINDINGS };
    saveBindings(bindings);
    set({ bindings });
  },
}));
