import { History } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { Cover } from "@/components/Cover";
import { EmptyState } from "@/components/EmptyState";
import { focus, muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import type { Track } from "@/types";

export function RecentTracksCard({ tracks }: { tracks: Track[] }) {
  const playTrack = usePlayer((state) => state.playTrack);
  return (
    <Card className="flex flex-col p-5 md:col-span-2 xl:col-span-2 xl:row-span-2">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History size={17} className="text-kalo-accent dark:text-kalo-dark-accent" />
          <h2 className="font-display text-lg">Écoutés récemment</h2>
        </div>
        <Link to="/library" className={cn("text-xs hover:underline", muted)}>Toute la bibliothèque</Link>
      </div>
      {tracks.length === 0 ? (
        <EmptyState icon={History} title="Rien pour l'instant" description="Les morceaux que vous écoutez apparaîtront ici." />
      ) : (
        <ul className="flex flex-1 flex-col justify-center gap-1">
          {tracks.map((track) => (
            <li key={track.id}>
              <button
                type="button"
                onClick={() => playTrack(track, tracks, "Récents")}
                className={`${focus} flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-kalo-raised/60 dark:hover:bg-kalo-dark-raised/60`}
              >
                <Cover src={track.coverPath} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{track.title}</span>
                  <span className={cn("block truncate text-xs", muted)}>{track.artist ?? "Artiste inconnu"}</span>
                </span>
                <span className={cn("shrink-0 text-xs tabular-nums", muted)}>{formatDuration(track.durationMs)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
