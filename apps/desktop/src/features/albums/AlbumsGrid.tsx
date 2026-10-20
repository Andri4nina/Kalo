import type { AlbumSummary } from "@/types";
import { AlbumCard } from "./AlbumCard";

export function AlbumsGrid({ albums }: { albums: AlbumSummary[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}
