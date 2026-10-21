export type ShortcutAction =
  | "toggle"
  | "seekBack"
  | "seekForward"
  | "mute"
  | "next"
  | "previous"
  | "queue"
  | "shuffle"
  | "repeat";

export interface ShortcutDefinition {
  id: ShortcutAction;
  label: string;
  code: string;
}

export const SHORTCUTS: ShortcutDefinition[] = [
  { id: "toggle", label: "Lecture / pause", code: "Space" },
  { id: "seekBack", label: "Reculer de 5 s", code: "ArrowLeft" },
  { id: "seekForward", label: "Avancer de 5 s", code: "ArrowRight" },
  { id: "mute", label: "Couper le son", code: "KeyM" },
  { id: "previous", label: "Morceau précédent", code: "KeyP" },
  { id: "next", label: "Morceau suivant", code: "KeyN" },
  { id: "queue", label: "Ouvrir la file", code: "KeyQ" },
  { id: "shuffle", label: "Lecture aléatoire", code: "KeyS" },
  { id: "repeat", label: "Répétition", code: "KeyR" },
];

export type ShortcutBindings = Record<ShortcutAction, string>;

export const DEFAULT_BINDINGS = Object.fromEntries(
  SHORTCUTS.map((shortcut) => [shortcut.id, shortcut.code]),
) as ShortcutBindings;

const LABELS: Record<string, string> = {
  Space: "Espace",
  ArrowLeft: "←",
  ArrowRight: "→",
  ArrowUp: "↑",
  ArrowDown: "↓",
  Escape: "Échap",
};

export function keyLabel(code: string): string {
  return LABELS[code] ?? code.replace(/^Key/, "").replace(/^Digit/, "");
}
