import { Cover } from "@/components/Cover";
import { MediaCard } from "@/components/MediaCard";
import { albumTracks } from "@/features/browse/collection.play";
import { usePlayCollection } from "@/features/browse/usePlayCollection";
import type { AlbumSummary } from "@/types";

export function AlbumCard({ album }: { album: AlbumSummary }) {
  const { busy, play } = usePlayCollection();
  const year = album.year ? `${album.year} · ` : "";
  return (
    <MediaCard
      to={`/albums/${album.id}`}
      title={album.title}
      subtitle={`${year}${album.artist ?? "Artiste inconnu"}`}
      artwork={<Cover src={album.coverPath} size="square" />}
      playBusy={busy}
      onPlay={() => void play(() => albumTracks(album.id), album.title)}
    />
  );
}
