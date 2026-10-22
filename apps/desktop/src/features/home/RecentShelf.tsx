import { History } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { focus, heading, mediaGrid, muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { RecentTrackCard } from "./RecentTrackCard";

/** Étagère « Écoutés récemment » : les derniers morceaux lus, prêts à relancer. */
export function RecentShelf({ tracks }: { tracks: Track[] }) {
  const playTrack = usePlayer((state) => state.playTrack);
  return (
    <section aria-labelledby="home-recent" className="mb-8">
      <div className="mb-2 flex items-end justify-between gap-3">
        <h2 id="home-recent" className={cn(heading, "text-2xl")}>Écoutés récemment</h2>
        <Link to="/library" className={cn(focus, "rounded text-sm font-bold hover:underline", muted)}>
          Toute la bibliothèque
        </Link>
      </div>
      {tracks.length === 0 ? (
        <Card>
          <EmptyState icon={History} title="Rien pour l'instant" description="Les morceaux que vous écoutez apparaîtront ici." />
        </Card>
      ) : (
        <div className={mediaGrid}>
          {tracks.map((track) => (
            <RecentTrackCard key={track.id} track={track} onPlay={() => playTrack(track, tracks, "Récents")} />
          ))}
        </div>
      )}
    </section>
  );
}
