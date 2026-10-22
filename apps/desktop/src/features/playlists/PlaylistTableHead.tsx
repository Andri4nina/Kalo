import { divider } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { SelectAllCell } from "@/features/library/SelectAllCell";
import { trackHead } from "@/features/library/track.row.styles";
import type { TrackSelection } from "@/features/library/useTrackSelection";

interface Props {
  tracks: Track[];
  selection: TrackSelection;
}

export function PlaylistTableHead({ tracks, selection }: Props) {
  const allSelected = tracks.length > 0 && tracks.every((track) => selection.selected.has(track.id));
  return (
    <thead>
      <tr>
        <SelectAllCell checked={allSelected} onToggle={() => selection.toggleAll(tracks.map((track) => track.id))} />
        <th scope="col" className={cn(trackHead, "text-right")}>#</th>
        <th scope="col" className={trackHead}>Titre</th>
        <th scope="col" className={cn(trackHead, "hidden lg:table-cell")}>Album</th>
        <th scope="col" className={cn(trackHead, "hidden text-right sm:table-cell")}>Durée</th>
        <th scope="col" className={trackHead}><span className="sr-only">Actions</span></th>
      </tr>
      <tr aria-hidden="true">
        <td colSpan={6} className="pb-2"><div className={divider} /></td>
      </tr>
    </thead>
  );
}
