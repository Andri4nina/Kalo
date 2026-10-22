import { Cover } from "@/components/Cover";
import { DetailHero } from "@/components/DetailHero";
import { PlayCircleButton } from "@/components/PlayCircleButton";
import { albumTracks } from "@/features/browse/collection.play";
import { usePlayCollection } from "@/features/browse/usePlayCollection";
import type { AlbumSummary } from "@/types";

export function AlbumDetailHeader({ album }: { album: AlbumSummary }) {
  const { busy, play } = usePlayCollection();
  const year = album.year ? ` · ${album.year}` : "";
  const tracks = album.trackCount > 1 ? "morceaux" : "morceau";
  return (
    <DetailHero
      kind="Album"
      title={album.title}
      artwork={<Cover src={album.coverPath} size="hero" />}
      meta={
        <>
          <span className="font-bold text-kalo-ink dark:text-kalo-dark-ink">{album.artist ?? "Artiste inconnu"}</span>
          {year} · {album.trackCount} {tracks}
        </>
      }
    >
      <PlayCircleButton
        size="lg"
        label={`Lire l'album ${album.title}`}
        busy={busy}
        disabled={album.trackCount === 0}
        onClick={() => void play(() => albumTracks(album.id), album.title)}
      />
    </DetailHero>
  );
}
