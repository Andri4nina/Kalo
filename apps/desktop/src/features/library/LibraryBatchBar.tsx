import { ListMusic, ListPlus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { AddToPlaylistModal } from "./AddToPlaylistModal";

interface Props {
  tracks: Track[];
  onClear: () => void;
}

export function LibraryBatchBar({ tracks, onClear }: Props) {
  const enqueue = usePlayer((state) => state.enqueue);
  const [open, setOpen] = useState(false);
  const enqueueAll = () => {
    for (const track of tracks) if (!track.isMissing) enqueue(track);
    onClear();
  };
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2 rounded-2xl border border-kalo-line bg-kalo-panel p-3 dark:border-kalo-dark-line dark:bg-kalo-dark-panel">
      <span className="mr-2 text-xs font-medium">{tracks.length} sélectionné(s)</span>
      <Button size="sm" variant="subtle" onClick={enqueueAll}>
        <ListPlus size={14} aria-hidden />
        Ajouter à la file
      </Button>
      <Button size="sm" variant="subtle" onClick={() => setOpen(true)}>
        <ListMusic size={14} aria-hidden />
        Ajouter à une playlist
      </Button>
      <Button size="sm" variant="ghost" onClick={onClear}>
        <X size={14} aria-hidden />
        Effacer
      </Button>
      <AddToPlaylistModal open={open} trackIds={tracks.map((track) => track.id)} onClose={() => setOpen(false)} />
    </div>
  );
}
