import { Cover } from "@/components/Cover";
import { MissingBadge } from "@/components/MissingBadge";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";

interface Props {
  track: Track;
  current: boolean;
  onPlay: () => void;
}

/** Cellule titre : pochette, titre cliquable (lecture) et artiste en dessous. */
export function TrackTitleCell({ track, current, onPlay }: Props) {
  return (
    <td className="min-w-48 py-2 pr-3">
      <div className="flex items-center gap-3">
        <Cover src={track.coverPath} size="sm" />
        <div className="min-w-0">
          <button
            type="button"
            disabled={track.isMissing}
            title={track.isMissing ? `Fichier introuvable : ${track.path}` : undefined}
            onClick={onPlay}
            className={cn(
              focus,
              "block max-w-full truncate rounded text-left text-sm font-medium hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-70",
              current && "text-kalo-accent-strong dark:text-kalo-dark-accent",
            )}
          >
            {track.title}
          </button>
          <p className={cn("truncate text-xs", muted)}>{track.artist ?? "Artiste inconnu"}</p>
          {track.isMissing ? <MissingBadge /> : null}
        </div>
      </div>
    </td>
  );
}
