import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

/** Engagement explicite : Kalo ne télécharge que ce que la source autorise. */
export function RightsCheckbox({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className={cn("flex items-start gap-2 text-xs leading-relaxed", muted)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={cn(focus, "mt-0.5 h-4 w-4 accent-kalo-accent dark:accent-kalo-dark-accent")}
      />
      <span>
        Je confirme que la source autorise ce téléchargement et que j'ai le droit de conserver ce fichier. Kalo ne
        contourne aucune protection ni condition d'utilisation (YouTube et services de streaming exclus).
      </span>
    </label>
  );
}
