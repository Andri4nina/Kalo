import { RotateCcw } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { BAND_LABELS, BANDS } from "./eq";
import { PRESETS } from "./presets";
import { EqBand } from "./EqBand";
import { useStudio } from "./studio.store";

export function EqCard() {
  const enabled = useStudio((state) => state.enabled);
  const gains = useStudio((state) => state.gains);
  const preset = useStudio((state) => state.preset);
  const setEnabled = useStudio((state) => state.setEnabled);
  const setBand = useStudio((state) => state.setBand);
  const reset = useStudio((state) => state.reset);
  const label = PRESETS.find((item) => item.id === preset)?.label ?? "Personnalisé";
  return (
    <Card className="p-5 xl:col-span-2">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold tracking-tight text-lg">Égaliseur graphique</h2>
          <p className={cn("mt-1 text-xs", muted)}>10 bandes, de 31 Hz à 16 kHz, ±12 dB.</p>
        </div>
        <Button size="sm" variant={enabled ? "primary" : "subtle"} aria-pressed={enabled} onClick={() => setEnabled(!enabled)}>
          {enabled ? "Actif" : "Bypass"}
        </Button>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {BANDS.map((hz, index) => (
          <EqBand
            key={hz}
            hz={hz}
            label={BAND_LABELS[index] ?? `${hz}`}
            gain={gains[index] ?? 0}
            disabled={!enabled}
            onChange={(value) => setBand(index, value)}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className={cn("text-xs", muted)}>{label}</span>
        <Button size="sm" variant="ghost" onClick={reset}>
          <RotateCcw size={14} /> Réinitialiser
        </Button>
      </div>
    </Card>
  );
}
