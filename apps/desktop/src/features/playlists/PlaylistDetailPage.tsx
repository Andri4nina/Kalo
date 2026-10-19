import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Spinner } from "@/components/Spinner";
import { PlaylistEmpty } from "./PlaylistEmpty";
import { PlaylistHeaderActions } from "./PlaylistHeaderActions";
import { PlaylistMissing } from "./PlaylistMissing";
import { PlaylistTrackTable } from "./PlaylistTrackTable";
import { RenamePlaylistModal } from "./RenamePlaylistModal";
import { usePlaylistDetail } from "./usePlaylistDetail";

export function PlaylistDetailPage() {
  const params = useParams();
  const playlistId = Number(params.playlistId);
  const { data, loading, error } = usePlaylistDetail(playlistId);
  const [renaming, setRenaming] = useState(false);

  if (loading && !data) return <Spinner label="Chargement de la playlist" />;
  if (error || !data) return <PlaylistMissing message={error ?? "Playlist introuvable"} />;

  return (
    <div>
      <PageHeader
        eyebrow="Playlist"
        title={data.playlist.name}
        description={`${data.tracks.length} morceau${data.tracks.length > 1 ? "x" : ""}`}
        actions={<PlaylistHeaderActions tracks={data.tracks} onRename={() => setRenaming(true)} />}
      />
      {data.tracks.length === 0 ? (
        <PlaylistEmpty />
      ) : (
        <PlaylistTrackTable playlistId={data.playlist.id} tracks={data.tracks} />
      )}
      <RenamePlaylistModal playlist={data.playlist} open={renaming} onClose={() => setRenaming(false)} />
    </div>
  );
}
