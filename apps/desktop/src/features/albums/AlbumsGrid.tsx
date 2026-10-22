import { mediaGrid } from "@/design/tokens";
import type { AlbumSummary } from "@/types";
import { AlbumCard } from "./AlbumCard";

export function AlbumsGrid({ albums }: { albums: AlbumSummary[] }) {
  return (
    <div className={mediaGrid}>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
