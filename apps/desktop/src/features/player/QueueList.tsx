import { ListMusic } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import type { Track } from "@/types";
import { QueueItem } from "./QueueItem";

export function QueueList({ queue, index }: { queue: Track[]; index: number }) {
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
        <QueueItem
          key={`${track.id}-${position}`}
          track={track}
          index={position}
          current={position === index}
          total={queue.length}
        />
      ))}
    </div>
  );
}
