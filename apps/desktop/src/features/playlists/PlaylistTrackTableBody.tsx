import { usePlayer } from "@/features/player/player.store";
import type { TrackSelection } from "@/features/library/useTrackSelection";
import type { Track } from "@/types";
import { PlaylistTrackRow } from "./PlaylistTrackRow";
import type { PlaylistRow } from "./playlist.search";

interface Props {
  rows: PlaylistRow[];
  total: number;
  reorderable: boolean;
  tracks: Track[];
  currentId: number | undefined;
  source: string;
  selection: TrackSelection;
  onMove: (index: number, direction: -1 | 1) => void;
  onRemove: (trackId: number) => void;
}

/** Corps du tableau ; pendant une recherche, le réordonnancement est désactivé. */
export function PlaylistTrackTableBody({ rows, total, reorderable, tracks, currentId, source, selection, onMove, onRemove }: Props) {
  const playTrack = usePlayer((state) => state.playTrack);
  return (
    <tbody>
      {rows.map(({ track, index }) => (
        <PlaylistTrackRow
          key={track.id}
          track={track}
          index={index}
          current={track.id === currentId}
          canUp={reorderable && index > 0}
          canDown={reorderable && index < total - 1}
          selected={selection.selected.has(track.id)}
          onToggle={() => selection.toggle(track.id)}
          onPlay={() => playTrack(track, tracks, source)}
          onMove={(direction) => onMove(index, direction)}
          onRemove={() => onRemove(track.id)}
        />
      ))}
    </tbody>
  );
}
