import { mediaGrid } from "@/design/tokens";
import type { ArtistSummary } from "@/types";
import { ArtistCard } from "./ArtistCard";

export function ArtistsGrid({ artists }: { artists: ArtistSummary[] }) {
  return (
    <div className={mediaGrid}>
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
