import { ChevronDown, ChevronUp, X } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import type { Track } from "@/types";
import { SelectionCheckbox } from "@/features/library/SelectionCheckbox";
import { TrackIndexCell } from "@/features/library/TrackIndexCell";
import { TrackTitleCell } from "@/features/library/TrackTitleCell";
import { trackRowClass } from "@/features/library/track.row.styles";

interface Props {
  track: Track;
  index: number;
  current: boolean;
  canUp: boolean;
  canDown: boolean;
  selected: boolean;
  onToggle: () => void;
  onPlay: () => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}

export function PlaylistTrackRow(props: Props) {
  return (
    <tr className={trackRowClass(props.selected, props.track.isMissing)}>
      <td className="w-10 pl-3"><SelectionCheckbox checked={props.selected} label={`Sélectionner ${props.track.title}`} onChange={props.onToggle} /></td>
      <TrackIndexCell index={props.index} current={props.current} disabled={props.track.isMissing} onPlay={props.onPlay} />
      <TrackTitleCell track={props.track} current={props.current} onPlay={props.onPlay} />
      <td className={cn("hidden max-w-56 truncate py-2 pr-3 text-sm lg:table-cell", muted)}>{props.track.album ?? "—"}</td>
      <td className={cn("hidden py-2 pr-3 text-right text-sm tabular-nums sm:table-cell", muted)}>{formatDuration(props.track.durationMs)}</td>
      <td className="py-2 pr-2">
        <div className="flex items-center justify-end gap-0.5">
          <IconButton icon={ChevronUp} label="Monter" size="sm" disabled={!props.canUp} onClick={() => props.onMove(-1)} />
          <IconButton icon={ChevronDown} label="Descendre" size="sm" disabled={!props.canDown} onClick={() => props.onMove(1)} />
          <IconButton icon={X} label="Retirer de la playlist" size="sm" onClick={props.onRemove} />
        </div>
      </td>
    </tr>
  );
}
