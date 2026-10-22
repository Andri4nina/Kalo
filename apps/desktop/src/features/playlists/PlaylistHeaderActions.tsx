import { Pencil } from "lucide-react";
import { Button } from "@/components/Button";
import { PlayCircleButton } from "@/components/PlayCircleButton";
import { startCollection } from "@/features/browse/collection.play";
import type { Playlist, Track } from "@/types";
import { M3uActions } from "./M3uActions";

interface Props {
  playlist: Playlist;
  tracks: Track[];
  onRename: () => void;
}

export function PlaylistHeaderActions({ playlist, tracks, onRename }: Props) {
  return (
    <>
      <PlayCircleButton
        size="lg"
        label={`Lire la playlist ${playlist.name}`}
        disabled={tracks.length === 0}
        onClick={() => startCollection(tracks, playlist.name)}
      />
      <Button variant="outline" size="sm" onClick={onRename}>
        <Pencil size={15} /> Renommer
      </Button>
      <M3uActions playlist={playlist} />
    </>
  );
}
