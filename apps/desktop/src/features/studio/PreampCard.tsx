import { Volume2 } from "lucide-react";
import { Card } from "@/components/Card";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { MAX_PREAMP, MIN_PREAMP } from "./eq";
import { useStudio } from "./studio.store";

export function PreampCard() {
  const preamp = useStudio((state) => state.preamp);
  const setPreamp = useStudio((state) => state.setPreamp);
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
        <Volume2 size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Préampli
      </h2>
      <p className={cn("mt-1 text-xs", muted)}>
        Ajuste le niveau avant l'égaliseur pour éviter la saturation. Le fichier audio reste inchangé.
      </p>
      <div className="mt-4 flex items-center justify-between gap-2 text-xs">
        <label htmlFor="studio-preamp" className="font-medium">Gain d'entrée</label>
        <span className={cn("tabular-nums", muted)}>{preamp > 0 ? "+" : ""}{preamp.toFixed(1)} dB</span>
      </div>
      <input
        id="studio-preamp"
        type="range"
        min={MIN_PREAMP}
        max={MAX_PREAMP}
        step={0.5}
        value={preamp}
        onChange={(event) => setPreamp(Number(event.target.value))}
        aria-valuetext={`${preamp.toFixed(1)} décibels`}
        className={`${focus} mt-2 w-full accent-kalo-accent dark:accent-kalo-dark-accent`}
      />
    </Card>
  );
}