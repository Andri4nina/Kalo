import { Cover } from "@/components/Cover";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { AlbumSummary } from "@/types";

export function AlbumDetailHeader({ album }: { album: AlbumSummary }) {
  const year = album.year ? ` · ${album.year}` : "";
  const tracks = album.trackCount > 1 ? "morceaux" : "morceau";
  return (
    <header className="mb-6 flex items-end gap-4">
      <Cover src={album.coverPath} size="lg" />
      <div className="min-w-0">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-kalo-accent dark:text-kalo-dark-accent">
          Album
        </p>
        <h1 className="truncate font-display text-3xl leading-tight">{album.title}</h1>
        <p className={cn("mt-1 text-sm", muted)}>
          {album.artist ?? "Artiste inconnu"}
          {year} · {album.trackCount} {tracks}
        </p>
      </div>
    </header>
  );
}
