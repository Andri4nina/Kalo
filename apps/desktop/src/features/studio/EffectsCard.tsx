import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { EFFECT_KEYS, EFFECT_LABELS } from "./effects";
import { useStudio } from "./studio.store";

export function EffectsCard() {
  const effects = useStudio((state) => state.effects);
  const setEffect = useStudio((state) => state.setEffect);
  const resetEffects = useStudio((state) => state.resetEffects);
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-display text-lg">
          <SlidersHorizontal size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
          Chaîne d'effets
        </h2>
        <Button size="sm" variant="ghost" onClick={resetEffects}>Réinitialiser</Button>
      </div>
      <p className={cn("mt-1 text-xs", muted)}>
        Saturation, compression, réverbération et écho sont appliqués après l'égaliseur. Le bypass coupe l'ensemble.
      </p>
      <div className="mt-4 space-y-3">
        {EFFECT_KEYS.map((name) => (
          <label key={name} className="block text-xs">
            <span className="flex items-center justify-between gap-2">
              <span className="font-medium">{EFFECT_LABELS[name]}</span>
              <span className={cn("tabular-nums", muted)}>{Math.round(effects[name] * 100)} %</span>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={effects[name]}
              onChange={(event) => setEffect(name, event.target.valueAsNumber)}
              className={cn("mt-1 w-full accent-kalo-accent dark:accent-kalo-dark-accent", focus)}
            />
          </label>
        ))}
      </div>
    </Card>
  );
}
