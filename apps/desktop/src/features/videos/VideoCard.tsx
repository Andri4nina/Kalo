import { Film, Play } from "lucide-react";
import { playCircle, reveal, stretched } from "@/components/media.styles";
import { MissingBadge } from "@/components/MissingBadge";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import type { Video } from "@/types";

/** Carte d'un clip : toute la carte ouvre le lecteur vidéo. */
export function VideoCard({ video, onOpen }: { video: Video; onOpen: () => void }) {
  return (
    <div className={cn("group relative rounded-lg p-3 transition-colors hover:bg-kalo-card dark:hover:bg-kalo-dark-card", video.isMissing && "opacity-60")}>
      <div className="relative flex aspect-video w-full items-center justify-center rounded-md bg-kalo-raised text-kalo-muted shadow-cover dark:bg-kalo-dark-raised dark:text-kalo-dark-muted">
        <Film size={36} strokeWidth={1.6} aria-hidden="true" />
        <span aria-hidden="true" className={cn(playCircle("md"), "absolute bottom-2 right-2", reveal)}>
          <Play size={20} fill="currentColor" className="ml-0.5" />
        </span>
      </div>
      <button
        type="button"
        disabled={video.isMissing}
        onClick={onOpen}
        aria-label={`Regarder ${video.title}`}
        className={cn("mt-3 block w-full truncate text-left text-sm font-bold disabled:cursor-not-allowed", stretched)}
      >
        {video.title}
      </button>
      <p className={cn("mt-1 truncate text-xs", muted)}>
        {video.artist ?? "Artiste inconnu"} · {video.durationMs > 0 ? formatDuration(video.durationMs) : video.format}
      </p>
      {video.isMissing ? <MissingBadge /> : null}
    </div>
  );
}
