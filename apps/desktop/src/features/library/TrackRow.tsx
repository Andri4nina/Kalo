import { AudioLines } from "lucide-react";
import { MissingBadge } from "@/components/MissingBadge";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { TrackRowActions } from "./TrackRowActions";

interface Props {
  track: Track;
  index: number;
  queue: Track[];
  current: boolean;
}

export function TrackRow({ track, index, queue, current }: Props) {
  const playTrack = usePlayer((state) => state.playTrack);
  return (
    <tr className={cn("group transition-colors", track.isMissing && "opacity-60", current ? "bg-kalo-accent-soft/60 dark:bg-kalo-dark-accent-soft/60" : "hover:bg-kalo-raised/60 dark:hover:bg-kalo-dark-raised/60")}>
      <td className="w-12 py-2 pl-3 text-right text-xs tabular-nums">
        {current ? (
          <AudioLines size={15} className="ml-auto text-kalo-accent dark:text-kalo-dark-accent" aria-label="En lecture" />
        ) : (
          <span className={muted}>{index + 1}</span>
        )}
      </td>
      <td className="min-w-48 py-2 pr-3">
        <button type="button" disabled={track.isMissing} title={track.isMissing ? `Fichier introuvable : ${track.path}` : undefined} onClick={() => playTrack(track, queue)} className={`${focus} block max-w-full truncate rounded text-left text-sm font-medium hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-70`}>
          {track.title}
        </button>
        {track.isMissing ? <MissingBadge /> : null}
        <p className={cn("truncate text-xs md:hidden", muted)}>{track.artist ?? "Artiste inconnu"}</p>
      </td>
      <td className={cn("hidden max-w-48 truncate py-2 pr-3 text-sm md:table-cell", muted)}>{track.artist ?? "Artiste inconnu"}</td>
      <td className={cn("hidden max-w-56 truncate py-2 pr-3 text-sm lg:table-cell", muted)}>{track.album ?? "—"}</td>
      <td className={cn("hidden py-2 pr-3 text-xs sm:table-cell", muted)}>{track.format}</td>
      <td className={cn("py-2 pr-3 text-right text-xs tabular-nums", muted)}>{formatDuration(track.durationMs)}</td>
      <td className="py-2 pr-2"><TrackRowActions track={track} /></td>
    </tr>
  );
}
