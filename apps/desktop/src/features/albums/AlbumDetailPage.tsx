import { Disc3 } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { BrowseTrackSection } from "@/features/browse/BrowseTrackSection";
import { useAlbum, useAlbumTracks } from "@/features/browse/useBrowseDetail";
import { AlbumDetailHeader } from "./AlbumDetailHeader";

export function AlbumDetailPage() {
  const [page, setPage] = useState(0);
  const albumId = Number(useParams().albumId);
  const safeId = Number.isSafeInteger(albumId) && albumId > 0 ? albumId : 0;
  const album = useAlbum(safeId);
  const tracks = useAlbumTracks(safeId, page);

  if (album.loading) return <Spinner label="Chargement de l'album" />;
  if (album.error) return <ErrorNotice message={album.error} />;
  if (!album.data) {
    return (
      <Card>
        <EmptyState
          icon={Disc3}
          title="Album introuvable"
          description="Cet album n'existe plus dans la bibliothèque."
          action={<Link to="/albums"><Button size="sm" variant="subtle">Retour aux albums</Button></Link>}
        />
      </Card>
    );
  }
  return (
    <div>
      <AlbumDetailHeader album={album.data} />
      <BrowseTrackSection state={tracks} page={page} source={album.data.title} onPage={setPage} />
    </div>
  );
}
