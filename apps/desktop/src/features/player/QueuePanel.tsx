import { ListMusic, Trash2, X } from "lucide-react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { EmptyState } from "@/components/EmptyState";
import { IconButton } from "@/components/IconButton";
import { useDialogFocus } from "@/components/useDialogFocus";
import { usePlayer } from "./player.store";
import { QueueItem } from "./QueueItem";

export function QueuePanel() {
  const open = usePlayer((state) => state.queueOpen);
  const queue = usePlayer((state) => state.queue);
  const index = usePlayer((state) => state.index);
  const { setQueueOpen, clearQueue } = usePlayer.getState();
  const panel = useRef<HTMLElement>(null);
  useDialogFocus(open, panel, () => setQueueOpen(false));
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onMouseDown={() => setQueueOpen(false)}>
      <aside
        ref={panel} role="dialog" aria-modal="true" aria-label="File d'attente"
        className="flex h-full w-full max-w-md flex-col rounded-l-3xl border border-kalo-line bg-kalo-panel dark:border-kalo-dark-line dark:bg-kalo-dark-panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between gap-3 p-5">
          <div className="flex items-center gap-2">
            <ListMusic size={18} className="text-kalo-accent dark:text-kalo-dark-accent" />
            <h2 className="font-display text-lg">File d'attente</h2>
            <span className="text-xs text-kalo-muted dark:text-kalo-dark-muted">{queue.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <IconButton icon={Trash2} label="Vider la file" onClick={clearQueue} disabled={queue.length === 0} />
            <IconButton icon={X} label="Fermer" onClick={() => setQueueOpen(false)} />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-3 pb-5">
          {queue.length === 0 ? (
            <EmptyState icon={ListMusic} title="File vide" description="Ajoutez des morceaux depuis la bibliothèque pour construire votre file d'attente." />
          ) : (
            queue.map((track, position) => (
              <QueueItem key={`${track.id}-${position}`} track={track} index={position} current={position === index} />
            ))
          )}
        </div>
      </aside>
    </div>,
    document.body,
  );
}
