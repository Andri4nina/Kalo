import { MediaCard } from "@/components/MediaCard";
import { artistTracks } from "@/features/browse/collection.play";
import { usePlayCollection } from "@/features/browse/usePlayCollection";
import type { ArtistSummary } from "@/types";
import { ArtistAvatar } from "./ArtistAvatar";

export function ArtistCard({ artist }: { artist: ArtistSummary }) {
  const { busy, play } = usePlayCollection();
  const tracks = artist.trackCount > 1 ? "morceaux" : "morceau";
  return (
    <MediaCard
      to={`/artists/${artist.id}`}
      title={artist.name}
      subtitle={`Artiste · ${artist.trackCount} ${tracks}`}
      artwork={<ArtistAvatar name={artist.name} size="square" />}
      playBusy={busy}
      onPlay={() => void play(() => artistTracks(artist.id), artist.name)}
    />
  );
}
