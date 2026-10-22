import { RotateCcw } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useEqShape } from "./eq.shape.store";
import { ParametricBand } from "./ParametricBand";

/** Mode paramétrique : déplacer chaque bande et régler sa largeur. */
export function ParametricCard() {
  const bands = useEqShape((state) => state.bands);
  const setBand = useEqShape((state) => state.setBand);
  const reset = useEqShape((state) => state.reset);
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold tracking-tight">Égaliseur paramétrique</h2>
          <p className={cn("mt-1 text-xs", muted)}>
            Fréquence (20 Hz à 20 kHz) et largeur Q (0,3 à 8) de chaque bande. Le gain se règle dans l'égaliseur graphique.
          </p>
        </div>
        <Button size="sm" variant="ghost" onClick={reset}>
          <RotateCcw size={14} aria-hidden /> Bandes d'origine
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className={cn("grid grid-cols-[auto_6rem_1fr_2.5rem] gap-2 text-[11px] font-medium", muted)}>
          <span className="w-6">#</span>
          <span>Hz</span>
          <span>Largeur</span>
          <span className="text-right">Q</span>
        </div>
        {bands.map((band, index) => (
          <ParametricBand key={index} index={index} band={band} onChange={(patch) => setBand(index, patch)} />
        ))}
      </div>
    </Card>
  );
}
