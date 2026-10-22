import { useState } from "react";
import { useParams } from "react-router-dom";
import { DetailHero } from "@/components/DetailHero";
import { Spinner } from "@/components/Spinner";
import { PlaylistArtwork } from "./PlaylistArtwork";
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
      <DetailHero
        kind="Playlist"
        title={data.playlist.name}
        artwork={<PlaylistArtwork size="hero" />}
        meta={`${data.tracks.length} morceau${data.tracks.length > 1 ? "x" : ""}`}
      >
        <PlaylistHeaderActions playlist={data.playlist} tracks={data.tracks} onRename={() => setRenaming(true)} />
      </DetailHero>
      {data.tracks.length === 0 ? (
        <PlaylistEmpty />
      ) : (
        <PlaylistTrackTable playlistId={data.playlist.id} tracks={data.tracks} source={data.playlist.name} />
      )}
      <RenamePlaylistModal playlist={data.playlist} open={renaming} onClose={() => setRenaming(false)} />
    </div>
  );
}
