import { useAsync } from "@/lib/useAsync";
import { listFormats } from "@/lib/api/library";
import { useLibraryVersion } from "./library.store";
import { chipSelect } from "@/design/tokens";
import type { TrackAvailability } from "@/types";

export interface FilterValue {
  format: string;
  availability: "all" | TrackAvailability;
  duration: "all" | "short" | "medium" | "long";
}

export const DEFAULT_FILTERS: FilterValue = { format: "all", availability: "all", duration: "all" };

interface Props {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function LibraryFilters({ value, onChange }: Props) {
  const version = useLibraryVersion((state) => state.version);
  const formats = useAsync(listFormats, [version]);
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <select aria-label="Filtrer par disponibilité" className={chipSelect} value={value.availability} onChange={(event) => onChange({ ...value, availability: event.target.value as FilterValue["availability"] })}>
        <option value="all">Tous les fichiers</option>
        <option value="available">Disponibles</option>
        <option value="missing">Manquants</option>
      </select>
      <select aria-label="Filtrer par format" className={chipSelect} value={value.format} onChange={(event) => onChange({ ...value, format: event.target.value })}>
        <option value="all">Tous les formats</option>
        {(formats.data ?? []).map((format) => <option key={format} value={format}>{format}</option>)}
      </select>
      <select aria-label="Filtrer par durée" className={chipSelect} value={value.duration} onChange={(event) => onChange({ ...value, duration: event.target.value as FilterValue["duration"] })}>
        <option value="all">Toutes les durées</option>
        <option value="short">Moins de 2 min</option>
        <option value="medium">2 à 5 min</option>
        <option value="long">Plus de 5 min</option>
      </select>
    </div>
  );
}