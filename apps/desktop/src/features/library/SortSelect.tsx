import { SlidersHorizontal } from "lucide-react";
import { input } from "@/design/tokens";
import type { TrackSort } from "@/types";

const options: Array<{ value: TrackSort; label: string }> = [
  { value: "added", label: "Ajout récent" },
  { value: "title", label: "Titre" },
  { value: "artist", label: "Artiste" },
  { value: "album", label: "Album" },
  { value: "year", label: "Année" },
  { value: "duration", label: "Durée" },
];

export function SortSelect({ value, onChange }: { value: TrackSort; onChange: (value: TrackSort) => void }) {
  return (
    <div className="flex items-center gap-2">
      <SlidersHorizontal size={15} className="text-kalo-muted dark:text-kalo-dark-muted" aria-hidden="true" />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as TrackSort)}
        aria-label="Trier la bibliothèque"
        className={`${input} w-auto`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
