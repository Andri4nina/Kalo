import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DetailHero } from "@/components/DetailHero";
import { SearchField } from "@/components/SearchField";
import { Spinner } from "@/components/Spinner";
import { PlaylistArtwork } from "./PlaylistArtwork";
import { PlaylistDetailsModal } from "./PlaylistDetailsModal";
import { PlaylistEmpty } from "./PlaylistEmpty";
import { PlaylistHeaderActions } from "./PlaylistHeaderActions";
import { PlaylistMissing } from "./PlaylistMissing";
import { PlaylistTrackTable } from "./PlaylistTrackTable";
import { usePlaylistDetail } from "./usePlaylistDetail";

export function PlaylistDetailPage() {
  const playlistId = Number(useParams().playlistId);
  const { data, loading, error } = usePlaylistDetail(playlistId);
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => setQuery(""), [playlistId]);

  if (loading && !data) return <Spinner label="Chargement de la playlist" />;
  if (error || !data) return <PlaylistMissing message={error ?? "Playlist introuvable"} />;
  const { playlist, tracks } = data;

  return (
    <div>
      <DetailHero
        kind="Playlist"
        title={playlist.name}
        description={playlist.description}
        artwork={<PlaylistArtwork size="hero" src={playlist.coverPath} />}
        meta={`${tracks.length} morceau${tracks.length > 1 ? "x" : ""}`}
      >
        <PlaylistHeaderActions playlist={playlist} tracks={tracks} onEdit={() => setEditing(true)} />
      </DetailHero>
      {tracks.length === 0 ? (
        <PlaylistEmpty />
      ) : (
        <>
          <SearchField value={query} onChange={setQuery} placeholder="Rechercher dans la playlist" label="Rechercher dans la playlist" className="mb-4 max-w-sm" />
          <PlaylistTrackTable playlistId={playlist.id} tracks={tracks} query={query} source={playlist.name} />
        </>
      )}
      {editing ? <PlaylistDetailsModal playlist={playlist} open onClose={() => setEditing(false)} /> : null}
    </div>
  );
}
