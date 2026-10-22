import { BookmarkPlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { focus, input, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { MAX_CUSTOM_PRESETS } from "./custom.presets";
import { useStudio } from "./studio.store";

export function CustomPresetsCard() {
  const presets = useStudio((state) => state.customPresets);
  const active = useStudio((state) => state.preset);
  const savePreset = useStudio((state) => state.savePreset);
  const deletePreset = useStudio((state) => state.deletePreset);
  const applyCustom = useStudio((state) => state.applyCustom);
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const save = () => {
    if (savePreset(label)) { setLabel(""); setError(null); }
    else setError(`Saisissez un nom (${MAX_CUSTOM_PRESETS} presets maximum).`);
  };
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
        <BookmarkPlus size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Presets personnalisés
      </h2>
      <p className={cn("mt-1 text-xs", muted)}>Enregistrez les réglages actuels (égaliseur, préampli et effets) sous un nom.</p>
      <div className="mt-3 flex gap-2">
        <input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Nom du preset" aria-label="Nom du preset" maxLength={40} className={cn(input, "flex-1")} />
        <Button size="sm" onClick={save}><BookmarkPlus size={14} aria-hidden /> Enregistrer</Button>
      </div>
      {error ? <p className="mt-2 text-xs text-kalo-danger dark:text-kalo-dark-danger">{error}</p> : null}
      {presets.length === 0 ? (
        <p className={cn("mt-3 text-xs", muted)}>Aucun preset personnalisé pour le moment.</p>
      ) : (
        <ul className="mt-3 divide-y divide-kalo-line dark:divide-kalo-dark-line">
          {presets.map((preset) => (
            <li key={preset.id} className="flex items-center justify-between gap-2 py-1">
              <button type="button" onClick={() => applyCustom(preset.id)} className={cn("min-w-0 flex-1 truncate rounded-lg px-1 py-1 text-left text-xs", focus, active === preset.id && "font-medium text-kalo-accent-strong dark:text-kalo-dark-accent")}>{preset.label}</button>
              <IconButton icon={Trash2} label={`Supprimer ${preset.label}`} size="sm" onClick={() => deletePreset(preset.id)} />
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
