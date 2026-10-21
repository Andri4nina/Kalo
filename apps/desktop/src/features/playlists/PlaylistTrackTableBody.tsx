import { usePlayer } from "@/features/player/player.store";
import type { TrackSelection } from "@/features/library/useTrackSelection";
import type { Track } from "@/types";
import { PlaylistTrackRow } from "./PlaylistTrackRow";

interface Props {
  tracks: Track[];
  currentId: number | undefined;
  source: string;
  selection: TrackSelection;
  onMove: (index: number, direction: -1 | 1) => void;
  onRemove: (trackId: number) => void;
}

export function PlaylistTrackTableBody({ tracks, currentId, source, selection, onMove, onRemove }: Props) {
  const playTrack = usePlayer((state) => state.playTrack);
  return (
    <tbody>
      {tracks.map((track, index) => (
        <PlaylistTrackRow
          key={track.id}
          track={track}
          index={index}
          current={track.id === currentId}
          canUp={index > 0}
          canDown={index < tracks.length - 1}
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
