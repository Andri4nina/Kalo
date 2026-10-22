import { divider } from "@/design/tokens";
import type { Track } from "@/types";
import { SelectAllCell } from "./SelectAllCell";
import { trackHead } from "./track.row.styles";
import type { TrackSelection } from "./useTrackSelection";

const columns = ["#", "Titre", "Album", "Format", "Durée", ""];
const visibility = ["text-right", "", "hidden lg:table-cell", "hidden sm:table-cell", "text-right", ""];

interface Props {
  tracks: Track[];
  selection?: TrackSelection;
}

export function TrackTableHead({ tracks, selection }: Props) {
  const allSelected = tracks.length > 0 && tracks.every((track) => selection?.selected.has(track.id));
  return (
    <thead>
      <tr>
        {selection ? <SelectAllCell checked={allSelected} onToggle={() => selection.toggleAll(tracks.map((track) => track.id))} /> : null}
        {columns.map((label, index) => (
          <th key={`${label}-${index}`} scope="col" className={`${trackHead} ${visibility[index]}`}>
            {label || <span className="sr-only">Actions</span>}
          </th>
        ))}
      </tr>
      <tr aria-hidden="true">
        <td colSpan={columns.length + (selection ? 1 : 0)} className="pb-2">
          <div className={divider} />
        </td>
      </tr>
    </thead>
  );
}
