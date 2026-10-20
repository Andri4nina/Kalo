import type { ArtistSummary } from "@/types";
import { ArtistCard } from "./ArtistCard";

export function ArtistsGrid({ artists }: { artists: ArtistSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
