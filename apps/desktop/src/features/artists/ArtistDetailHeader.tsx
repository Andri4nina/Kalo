import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { ArtistSummary } from "@/types";

export function ArtistDetailHeader({ artist }: { artist: ArtistSummary }) {
  const albums = artist.albumCount > 1 ? "albums" : "album";
  const tracks = artist.trackCount > 1 ? "morceaux" : "morceau";
  return (
    <header className="mb-6 flex items-end gap-4">
      <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-kalo-accent-soft font-display text-3xl text-kalo-accent-strong dark:bg-kalo-dark-accent-soft dark:text-kalo-dark-accent">
        {artist.name.trim().charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-kalo-accent dark:text-kalo-dark-accent">
          Artiste
        </p>
        <h1 className="truncate font-display text-3xl leading-tight">{artist.name}</h1>
        <p className={cn("mt-1 text-sm", muted)}>
          {artist.trackCount} {tracks} · {artist.albumCount} {albums}
        </p>
      </div>
    </header>
  );
}
