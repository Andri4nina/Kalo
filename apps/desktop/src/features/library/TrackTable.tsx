import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { TrackRow } from "./TrackRow";
import { TrackTableHead } from "./TrackTableHead";
import { trackTable } from "./track.row.styles";
import type { TrackSelection } from "./useTrackSelection";

interface Props {
  tracks: Track[];
  selection?: TrackSelection;
  source?: string;
}

export function TrackTable({ tracks, selection, source }: Props) {
  const currentId = usePlayer((state) => state.queue[state.index]?.id);
  return (
    <div className="overflow-x-auto">
      <table className={trackTable}>
        <TrackTableHead tracks={tracks} selection={selection} />
        <tbody>
          {tracks.map((track, index) => (
            <TrackRow
              key={track.id}
              track={track}
              index={index}
              queue={tracks}
              current={track.id === currentId}
              selected={selection?.selected.has(track.id)}
              onToggle={selection ? () => selection.toggle(track.id) : undefined}
              source={source}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
