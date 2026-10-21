import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { SelectAllCell } from "@/features/library/SelectAllCell";
import type { TrackSelection } from "@/features/library/useTrackSelection";

const head = "px-3 py-2.5 text-[10px] uppercase tracking-[0.12em]";

interface Props {
  tracks: Track[];
  selection: TrackSelection;
}

export function PlaylistTableHead({ tracks, selection }: Props) {
  const allSelected = tracks.length > 0 && tracks.every((track) => selection.selected.has(track.id));
  return (
    <thead className="bg-kalo-raised/50 dark:bg-kalo-dark-raised/50">
      <tr>
        <SelectAllCell checked={allSelected} onToggle={() => selection.toggleAll(tracks.map((track) => track.id))} />
        <th className={cn(head, muted)}>#</th>
        <th className={cn(head, muted)}>Titre</th>
        <th className={cn(head, muted, "hidden md:table-cell")}>Artiste</th>
        <th className={cn(head, muted, "hidden text-right sm:table-cell")}>Durée</th>
        <th className={head}><span className="sr-only">Actions</span></th>
      </tr>
    </thead>
  );
}
