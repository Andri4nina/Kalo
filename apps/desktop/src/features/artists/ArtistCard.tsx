import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { ArtistSummary } from "@/types";

export function ArtistCard({ artist }: { artist: ArtistSummary }) {
  const initial = artist.name.trim().charAt(0).toUpperCase();
  const albums = artist.albumCount > 1 ? "albums" : "album";
  const tracks = artist.trackCount > 1 ? "morceaux" : "morceau";
  return (
    <Card className="p-4 transition-colors hover:bg-kalo-raised/40 dark:hover:bg-kalo-dark-raised/40">
      <Link to={`/artists/${artist.id}`} className={`${focus} flex items-center gap-3 rounded-xl`}>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-kalo-accent-soft font-display text-lg text-kalo-accent-strong dark:bg-kalo-dark-accent-soft dark:text-kalo-dark-accent">
          {initial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{artist.name}</span>
          <span className={cn("mt-0.5 block text-xs", muted)}>
            {artist.trackCount} {tracks} · {artist.albumCount} {albums}
          </span>
        </span>
        <ChevronRight size={16} className={muted} aria-hidden="true" />
      </Link>
    </Card>
  );
}
