import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { Cover } from "@/components/Cover";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { AlbumSummary } from "@/types";

export function AlbumCard({ album }: { album: AlbumSummary }) {
  const year = album.year ? ` · ${album.year}` : "";
  return (
    <Card className="p-3 transition-colors hover:bg-kalo-raised/40 dark:hover:bg-kalo-dark-raised/40">
      <Link to={`/albums/${album.id}`} className="block">
        <Cover src={album.coverPath} size="xl" className="mb-3" />
        <span className="block truncate text-sm font-semibold">{album.title}</span>
        <span className={cn("mt-0.5 block truncate text-xs", muted)}>
          {album.artist ?? "Artiste inconnu"}
          {year}
        </span>
      </Link>
    </Card>
  );
}
