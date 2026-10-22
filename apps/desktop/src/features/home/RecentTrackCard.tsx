import { Play } from "lucide-react";
import { Cover } from "@/components/Cover";
import { playCircle, reveal, stretched } from "@/components/media.styles";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";

interface Props {
  track: Track;
  onPlay: () => void;
}

/** Carte d'un morceau récent : toute la carte lance la lecture. */
export function RecentTrackCard({ track, onPlay }: Props) {
  return (
    <div className="group relative rounded-lg p-3 transition-colors hover:bg-kalo-card dark:hover:bg-kalo-dark-card">
      <div className="relative">
        <Cover src={track.coverPath} size="square" />
        <span aria-hidden="true" className={cn(playCircle("md"), "absolute bottom-2 right-2", reveal)}>
          <Play size={20} fill="currentColor" className="ml-0.5" />
        </span>
      </div>
      <button
        type="button"
        disabled={track.isMissing}
        onClick={onPlay}
        aria-label={`Lire ${track.title}`}
        className={cn("mt-3 block w-full truncate text-left text-sm font-bold disabled:cursor-not-allowed", stretched)}
      >
        {track.title}
      </button>
      <p className={cn("mt-1 truncate text-xs", muted)}>{track.artist ?? "Artiste inconnu"}</p>
    </div>
  );
}
