import { DetailHero } from "@/components/DetailHero";
import { PlayCircleButton } from "@/components/PlayCircleButton";
import { artistTracks } from "@/features/browse/collection.play";
import { usePlayCollection } from "@/features/browse/usePlayCollection";
import type { ArtistSummary } from "@/types";
import { ArtistAvatar } from "./ArtistAvatar";

export function ArtistDetailHeader({ artist }: { artist: ArtistSummary }) {
  const { busy, play } = usePlayCollection();
  const albums = artist.albumCount > 1 ? "albums" : "album";
  const tracks = artist.trackCount > 1 ? "morceaux" : "morceau";
  return (
    <DetailHero
      kind="Artiste"
      title={artist.name}
      artwork={<ArtistAvatar name={artist.name} size="hero" />}
      meta={`${artist.trackCount} ${tracks} · ${artist.albumCount} ${albums}`}
    >
      <PlayCircleButton
        size="lg"
        label={`Lire ${artist.name}`}
        busy={busy}
        disabled={artist.trackCount === 0}
        onClick={() => void play(() => artistTracks(artist.id), artist.name)}
      />
    </DetailHero>
  );
}
