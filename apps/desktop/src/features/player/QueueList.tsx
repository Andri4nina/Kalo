import { GripVertical, ListMusic } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { QueueItem } from "./QueueItem";
import { useQueueDrag } from "./useQueueDrag";

export function QueueList({ queue, index }: { queue: Track[]; index: number }) {
  const drag = useQueueDrag();
  if (queue.length === 0) {
    return (
      <EmptyState
        icon={ListMusic}
        title="File vide"
        description="Ajoutez des morceaux depuis la bibliothèque pour construire votre file d'attente."
      />
    );
  }
  return (
    <div className="flex-1 overflow-y-auto px-3 pb-5">
      {queue.map((track, position) => (
        <div
          key={`${track.id}-${position}`}
          {...drag.bind(position)}
          className={cn(
            "flex items-center rounded-md",
            drag.from === position && "opacity-50",
            drag.over === position && drag.from !== position && "ring-2 ring-kalo-accent dark:ring-kalo-dark-accent",
          )}
        >
          <GripVertical size={14} aria-hidden="true" className={cn("shrink-0 cursor-grab", muted)} />
          <div className="min-w-0 flex-1">
            <QueueItem track={track} index={position} current={position === index} total={queue.length} />
          </div>
        </div>
      ))}
    </div>
  );
}
