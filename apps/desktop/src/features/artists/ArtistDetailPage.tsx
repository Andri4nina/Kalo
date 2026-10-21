import { Mic2 } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { BrowseTrackSection } from "@/features/browse/BrowseTrackSection";
import { useArtist, useArtistTracks } from "@/features/browse/useBrowseDetail";
import { ArtistDetailHeader } from "./ArtistDetailHeader";

export function ArtistDetailPage() {
  const [page, setPage] = useState(0);
  const artistId = Number(useParams().artistId);
  const safeId = Number.isSafeInteger(artistId) && artistId > 0 ? artistId : 0;
  const artist = useArtist(safeId);
  const tracks = useArtistTracks(safeId, page);

  if (artist.loading) return <Spinner label="Chargement de l'artiste" />;
  if (artist.error) return <ErrorNotice message={artist.error} />;
  if (!artist.data) {
    return (
      <Card>
        <EmptyState
          icon={Mic2}
          title="Artiste introuvable"
          description="Cet artiste n'existe plus dans la bibliothèque."
          action={<Link to="/artists"><Button size="sm" variant="subtle">Retour aux artistes</Button></Link>}
        />
      </Card>
    );
  }
  return (
    <div>
      <ArtistDetailHeader artist={artist.data} />
      <BrowseTrackSection state={tracks} page={page} source={artist.data.name} onPage={setPage} />
    </div>
  );
}
