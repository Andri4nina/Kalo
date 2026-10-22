import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { SelectionCheckbox } from "./SelectionCheckbox";
import { TrackIndexCell } from "./TrackIndexCell";
import { TrackRowActions } from "./TrackRowActions";
import { TrackTitleCell } from "./TrackTitleCell";
import { trackRowClass } from "./track.row.styles";

interface Props {
  track: Track;
  index: number;
  queue: Track[];
  current: boolean;
  selected?: boolean;
  onToggle?: () => void;
  source?: string;
}

export function TrackRow({ track, index, queue, current, selected = false, onToggle, source }: Props) {
  const playTrack = usePlayer((state) => state.playTrack);
  const play = () => playTrack(track, queue, source);
  return (
    <tr className={trackRowClass(selected, track.isMissing)}>
      {onToggle ? <td className="w-10 pl-3"><SelectionCheckbox checked={selected} label={`Sélectionner ${track.title}`} onChange={onToggle} /></td> : null}
      <TrackIndexCell index={index} current={current} disabled={track.isMissing} onPlay={play} />
      <TrackTitleCell track={track} current={current} onPlay={play} />
      <td className={cn("hidden max-w-56 truncate py-2 pr-3 text-sm lg:table-cell", muted)}>{track.album ?? "—"}</td>
      <td className={cn("hidden py-2 pr-3 text-xs sm:table-cell", muted)}>{track.format}</td>
      <td className={cn("py-2 pr-3 text-right text-sm tabular-nums", muted)}>{formatDuration(track.durationMs)}</td>
      <td className="py-2 pr-2"><TrackRowActions track={track} /></td>
    </tr>
  );
}
