import { ListMusic } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { focus, muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { cn } from "@/lib/cn";

export function QueueOverviewCard() {
  const queue = usePlayer((state) => state.queue);
  const index = usePlayer((state) => state.index);
  const setOpen = usePlayer((state) => state.setQueueOpen);
  const upcoming = queue.slice(index + 1, index + 4);
  const current = queue[index];

  return (
    <Card className="flex flex-col p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ListMusic size={17} className="text-kalo-accent dark:text-kalo-dark-accent" />
          <h2 className="font-display text-lg">File d'attente</h2>
        </div>
        <button type="button" onClick={() => setOpen(true)} className={cn("rounded text-xs hover:underline", muted, focus)}>
          Ouvrir
        </button>
      </div>
      {queue.length === 0 ? (
        <EmptyState icon={ListMusic} title="File vide" description="Ajoutez des morceaux pour préparer votre écoute." />
      ) : (
        <div className="flex flex-1 flex-col justify-center gap-2">
          {current ? (
            <div className="rounded-xl bg-kalo-accent-soft/60 px-3 py-2 dark:bg-kalo-dark-accent-soft/60">
              <p className={cn("text-[10px] uppercase tracking-[0.14em]", muted)}>En lecture</p>
              <p className="truncate text-sm font-medium">{current.title}</p>
            </div>
          ) : null}
          {upcoming.map((track, position) => (
            <div key={`${track.id}-${position}`} className="flex items-center gap-2 px-3 text-sm">
              <span className={cn("w-4 text-xs tabular-nums", muted)}>{position + 1}</span>
              <span className="truncate">{track.title}</span>
            </div>
          ))}
          {upcoming.length === 0 ? <p className={cn("px-3 text-xs", muted)}>Aucun morceau à suivre.</p> : null}
        </div>
      )}
    </Card>
  );
}
