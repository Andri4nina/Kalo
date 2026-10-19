import { Pencil, Play } from "lucide-react";
import { Button } from "@/components/Button";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";

interface Props {
  tracks: Track[];
  onRename: () => void;
}

export function PlaylistHeaderActions({ tracks, onRename }: Props) {
  const playQueue = usePlayer((state) => state.playQueue);
  return (
    <>
      <Button size="sm" disabled={tracks.length === 0} onClick={() => playQueue(tracks)}>
        <Play size={15} fill="currentColor" /> Lire
      </Button>
      <Button variant="subtle" size="sm" onClick={onRename}>
        <Pencil size={15} /> Renommer
      </Button>
    </>
  );
}
