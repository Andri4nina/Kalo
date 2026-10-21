import { ListMusic } from "lucide-react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ConfirmModal } from "@/components/ConfirmModal";
import { EmptyState } from "@/components/EmptyState";
import { useDialogFocus } from "@/components/useDialogFocus";
import { usePlayer } from "./player.store";
import { QueueHeader } from "./QueueHeader";
import { QueueItem } from "./QueueItem";

export function QueuePanel() {
  const open = usePlayer((state) => state.queueOpen);
  const queue = usePlayer((state) => state.queue);
  const index = usePlayer((state) => state.index);
  const { setQueueOpen, clearQueue } = usePlayer.getState();
  const [confirmClear, setConfirmClear] = useState(false);
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
        <QueueHeader count={queue.length} onClear={() => setConfirmClear(true)} onClose={() => setQueueOpen(false)} />
        <div className="flex-1 overflow-y-auto px-3 pb-5">
          {queue.length === 0 ? (
            <EmptyState icon={ListMusic} title="File vide" description="Ajoutez des morceaux depuis la bibliothèque pour construire votre file d'attente." />
          ) : (
            queue.map((track, position) => (
              <QueueItem key={`${track.id}-${position}`} track={track} index={position} current={position === index} total={queue.length} />
            ))
          )}
        </div>
      </aside>
      <ConfirmModal
        open={confirmClear}
        title="Vider la file d'attente ?"
        description="Tous les morceaux en attente seront retirés. La lecture en cours s'arrêtera."
        confirmLabel="Vider"
        onConfirm={() => { clearQueue(); setConfirmClear(false); }}
        onClose={() => setConfirmClear(false)}
      />
    </div>,
    document.body,
  );
}
