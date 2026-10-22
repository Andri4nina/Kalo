import { Copy, Pencil } from "lucide-react";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { PlayCircleButton } from "@/components/PlayCircleButton";
import { startCollection } from "@/features/browse/collection.play";
import type { Playlist, Track } from "@/types";
import { M3uActions } from "./M3uActions";
import { usePlaylistDuplicate } from "./usePlaylistDuplicate";

interface Props {
  playlist: Playlist;
  tracks: Track[];
  onEdit: () => void;
}

export function PlaylistHeaderActions({ playlist, tracks, onEdit }: Props) {
  const copy = usePlaylistDuplicate(playlist.id);
  return (
    <>
      <PlayCircleButton
        size="lg"
        label={`Lire la playlist ${playlist.name}`}
        disabled={tracks.length === 0}
        onClick={() => startCollection(tracks, playlist.name)}
      />
      <Button variant="outline" size="sm" onClick={onEdit}>
        <Pencil size={15} aria-hidden /> Modifier
      </Button>
      <Button variant="outline" size="sm" disabled={copy.busy} onClick={() => void copy.duplicate()}>
        <Copy size={15} aria-hidden /> {copy.busy ? "Copie..." : "Dupliquer"}
      </Button>
      <M3uActions playlist={playlist} />
      {copy.error ? <div className="w-full"><ErrorNotice message={copy.error} /></div> : null}
    </>
  );
}
