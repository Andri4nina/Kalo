import { ListPlus } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { usePlayer } from "@/features/player/player.store";
import { FavoriteButton } from "@/features/player/FavoriteButton";
import type { Track } from "@/types";
import { AddToPlaylistButton } from "./AddToPlaylistButton";

export function TrackRowActions({ track }: { track: Track }) {
  const enqueue = usePlayer((state) => state.enqueue);
  return (
    <div className="flex items-center justify-end gap-0.5">
      <FavoriteButton track={track} />
      <AddToPlaylistButton trackId={track.id} />
      <IconButton icon={ListPlus} label="Ajouter à la file d'attente" size="sm" onClick={() => enqueue(track)} />
    </div>
  );
}
