import { Keyboard, RotateCcw } from "lucide-react";
import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useShortcuts } from "./shortcut.store";
import { SHORTCUTS, type ShortcutAction } from "./shortcuts";
import { ShortcutRow } from "./ShortcutRow";

export function ShortcutCard() {
  const bindings = useShortcuts((state) => state.bindings);
  const assign = useShortcuts((state) => state.assign);
  const reset = useShortcuts((state) => state.reset);
  const [listening, setListening] = useState<ShortcutAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const capture = (action: ShortcutAction) => (event: KeyboardEvent<HTMLButtonElement>) => {
    if (listening !== action) return;
    event.preventDefault();
    if (event.code === "Escape") { setListening(null); return; }
    const message = assign(action, event.code);
    setError(message);
    if (!message) setListening(null);
  };
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
        <Keyboard size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Raccourcis clavier
      </h2>
      <p className={cn("mt-1 text-xs", muted)}>Cliquez sur une touche puis appuyez sur la nouvelle combinaison. Échap annule.</p>
      <ul className="mt-4 divide-y divide-kalo-line dark:divide-kalo-dark-line">
        {SHORTCUTS.map((shortcut) => (
          <ShortcutRow
            key={shortcut.id}
            shortcut={shortcut}
            binding={bindings[shortcut.id]}
            listening={listening === shortcut.id}
            onListen={() => { setListening(shortcut.id); setError(null); }}
            onKey={capture(shortcut.id)}
          />
        ))}
      </ul>
      {error ? <p className="mt-2 text-xs text-kalo-danger dark:text-kalo-dark-danger">{error}</p> : null}
      <Button variant="subtle" size="sm" className="mt-3" onClick={reset}><RotateCcw size={14} aria-hidden /> Réinitialiser</Button>
    </Card>
  );
}
