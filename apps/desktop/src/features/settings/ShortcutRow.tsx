import type { KeyboardEvent } from "react";
import { focus } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { keyLabel, type ShortcutDefinition } from "./shortcuts";

interface Props {
  shortcut: ShortcutDefinition;
  binding: string;
  listening: boolean;
  onListen: () => void;
  onKey: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export function ShortcutRow({ shortcut, binding, listening, onListen, onKey }: Props) {
  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <span className="text-xs">{shortcut.label}</span>
      <button
        type="button"
        onClick={onListen}
        onKeyDown={onKey}
        className={cn("min-w-24 rounded-lg border px-2 py-1 text-xs font-medium", focus, listening ? "border-kalo-accent bg-kalo-accent-soft dark:border-kalo-dark-accent dark:bg-kalo-dark-accent-soft" : "border-kalo-line dark:border-kalo-dark-line")}
      >
        {listening ? "Appuyez..." : keyLabel(binding)}
      </button>
    </li>
  );
}
