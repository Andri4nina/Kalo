import type { Track } from "@/types";
import { SelectAllCell } from "./SelectAllCell";
import type { TrackSelection } from "./useTrackSelection";

const columns = ["#", "Titre", "Artiste", "Album", "Format", "Durée", ""];

interface Props {
  tracks: Track[];
  selection?: TrackSelection;
}

export function TrackTableHead({ tracks, selection }: Props) {
  const allSelected = tracks.length > 0 && tracks.every((track) => selection?.selected.has(track.id));
  return (
    <thead className="bg-kalo-raised/50 dark:bg-kalo-dark-raised/50">
      <tr>
        {selection ? <SelectAllCell checked={allSelected} onToggle={() => selection.toggleAll(tracks.map((track) => track.id))} /> : null}
        {columns.map((label, index) => (
          <th
            key={`${label}-${index}`}
            scope="col"
            className={`px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-kalo-muted dark:text-kalo-dark-muted ${index === 3 ? "hidden lg:table-cell" : ""} ${index === 4 ? "hidden sm:table-cell" : ""} ${index === 5 ? "text-right" : ""}`}
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
