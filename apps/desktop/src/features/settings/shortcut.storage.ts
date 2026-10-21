import {
  DEFAULT_BINDINGS,
  SHORTCUTS,
  type ShortcutAction,
  type ShortcutBindings,
} from "./shortcuts";

const KEY = "kalo:shortcuts";

export function loadBindings(): ShortcutBindings {
  const bindings = { ...DEFAULT_BINDINGS };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return bindings;
    const parsed = JSON.parse(raw) as Partial<Record<ShortcutAction, unknown>>;
    for (const shortcut of SHORTCUTS) {
      const value = parsed[shortcut.id];
      if (typeof value === "string" && value.length > 0) bindings[shortcut.id] = value;
    }
  } catch {
    return bindings;
  }
  return bindings;
}

export function saveBindings(bindings: ShortcutBindings): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(bindings));
  } catch {
    // Stockage local indisponible : les raccourcis restent ceux de la session.
  }
}
