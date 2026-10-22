import { ArrowDown, ArrowUp, AudioLines, Trash2 } from "lucide-react";
import { Cover } from "@/components/Cover";
import { IconButton } from "@/components/IconButton";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { usePlayer } from "./player.store";
import type { Track } from "@/types";

interface QueueItemProps {
  track: Track;
  index: number;
  current: boolean;
  total: number;
}

export function QueueItem({ track, index, current, total }: QueueItemProps) {
  const removeFromQueue = usePlayer((state) => state.removeFromQueue);
  const moveInQueue = usePlayer((state) => state.moveInQueue);
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md px-2 py-1.5",
        current ? "bg-kalo-raised text-kalo-accent-strong dark:bg-kalo-dark-raised dark:text-kalo-dark-accent" : "hover:bg-kalo-raised dark:hover:bg-kalo-dark-raised",
      )}
    >
      <button
        type="button"
        onClick={() => usePlayer.getState().jumpTo(index)}
        className={cn("flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left", focus)}
      >
        <Cover src={track.coverPath} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{track.title}</span>
          <span className={cn("block truncate text-xs", muted)}>{track.artist ?? "Artiste inconnu"}</span>
        </span>
        {current ? <AudioLines size={15} className="shrink-0 text-kalo-accent dark:text-kalo-dark-accent" /> : null}
      </button>
      <IconButton icon={ArrowUp} label="Monter dans la file" size="sm" onClick={() => moveInQueue(index, index - 1)} disabled={index === 0} />
      <IconButton icon={ArrowDown} label="Descendre dans la file" size="sm" onClick={() => moveInQueue(index, index + 1)} disabled={index === total - 1} />
      <IconButton icon={Trash2} label="Retirer de la file" size="sm" onClick={() => removeFromQueue(index)} />
    </div>
  );
}
