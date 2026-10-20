import { ChevronDown, ChevronUp, X } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { MissingBadge } from "@/components/MissingBadge";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import type { Track } from "@/types";

interface Props {
  track: Track;
  index: number;
  current: boolean;
  canUp: boolean;
  canDown: boolean;
  onPlay: () => void;
  onMove: (direction: -1 | 1) => void;
  onRemove: () => void;
}

export function PlaylistTrackRow(props: Props) {
  return (
    <tr className={cn("transition-colors", props.track.isMissing && "opacity-60", props.current ? "bg-kalo-accent-soft/60 dark:bg-kalo-dark-accent-soft/60" : "hover:bg-kalo-raised/60 dark:hover:bg-kalo-dark-raised/60")}>
      <td className="w-10 py-2 pl-3 text-right text-xs tabular-nums">
        <span className={muted}>{props.index + 1}</span>
      </td>
      <td className="min-w-48 py-2 pr-3">
        <button type="button" disabled={props.track.isMissing} title={props.track.isMissing ? `Fichier introuvable : ${props.track.path}` : undefined} onClick={props.onPlay} className={`${focus} block max-w-full truncate rounded text-left text-sm font-medium hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-70`}>
          {props.track.title}
        </button>
        {props.track.isMissing ? <MissingBadge /> : null}
        <p className={cn("truncate text-xs md:hidden", muted)}>{props.track.artist ?? "Artiste inconnu"}</p>
      </td>
      <td className={cn("hidden max-w-48 truncate py-2 pr-3 text-sm md:table-cell", muted)}>{props.track.artist ?? "Artiste inconnu"}</td>
      <td className={cn("hidden py-2 pr-3 text-right text-xs tabular-nums sm:table-cell", muted)}>{formatDuration(props.track.durationMs)}</td>
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
