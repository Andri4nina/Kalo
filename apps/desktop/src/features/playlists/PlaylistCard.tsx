import { Trash2 } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { MediaCard } from "@/components/MediaCard";
import { playlistTracks } from "@/features/browse/collection.play";
import { usePlayCollection } from "@/features/browse/usePlayCollection";
import type { Playlist } from "@/types";
import { PlaylistArtwork } from "./PlaylistArtwork";

export function PlaylistCard({ playlist, onDelete }: { playlist: Playlist; onDelete: () => void }) {
  const { busy, play } = usePlayCollection();
  const count = `${playlist.trackCount} morceau${playlist.trackCount > 1 ? "x" : ""}`;
  return (
    <MediaCard
      to={`/playlists/${playlist.id}`}
      title={playlist.name}
      subtitle={playlist.description || `Playlist · ${count}`}
      artwork={<PlaylistArtwork size="square" src={playlist.coverPath} />}
      playBusy={busy}
      onPlay={playlist.trackCount > 0 ? () => void play(() => playlistTracks(playlist.id), playlist.name) : undefined}
      action={<IconButton icon={Trash2} label={`Supprimer la playlist ${playlist.name}`} size="sm" onClick={onDelete} />}
    />
  );
}
