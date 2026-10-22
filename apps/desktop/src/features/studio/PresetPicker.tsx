import { Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { PRESETS } from "./presets";
import { useStudio } from "./studio.store";

export function PresetPicker() {
  const active = useStudio((state) => state.preset);
  const applyPreset = useStudio((state) => state.applyPreset);
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <Sparkles size={17} className="text-kalo-accent dark:text-kalo-dark-accent" />
        <h2 className="font-display font-bold tracking-tight text-lg">Presets</h2>
      </div>
      <p className={cn("mt-1 text-xs", muted)}>
        Choisissez une courbe, puis ajustez chaque bande. Un preset active l'égaliseur.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <Button
            key={preset.id}
            size="sm"
            variant={active === preset.id ? "primary" : "subtle"}
            aria-pressed={active === preset.id}
            onClick={() => applyPreset(preset.id)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
