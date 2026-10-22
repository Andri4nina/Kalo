import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useDialogFocus } from "@/components/useDialogFocus";
import { usePlayer } from "./player.store";
import { QueueHeader } from "./QueueHeader";
import { QueueHistory } from "./QueueHistory";
import { QueueList } from "./QueueList";

export function QueuePanel() {
  const open = usePlayer((state) => state.queueOpen);
  const queue = usePlayer((state) => state.queue);
  const index = usePlayer((state) => state.index);
  const history = usePlayer((state) => state.history);
  const queueSource = usePlayer((state) => state.queueSource);
  const { setQueueOpen, clearQueue } = usePlayer.getState();
  const [confirmClear, setConfirmClear] = useState(false);
  const panel = useRef<HTMLElement>(null);
  useDialogFocus(open, panel, () => setQueueOpen(false));
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 p-2" onMouseDown={() => setQueueOpen(false)}>
      <aside
        ref={panel} role="dialog" aria-modal="true" aria-label="File d'attente"
        className="flex h-full w-full max-w-md flex-col rounded-lg border border-kalo-line bg-kalo-panel shadow-soft dark:border-kalo-dark-line dark:bg-kalo-dark-panel"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <QueueHeader count={queue.length} source={queueSource} onClear={() => setConfirmClear(true)} onClose={() => setQueueOpen(false)} />
        <QueueHistory tracks={history} />
        <QueueList queue={queue} index={index} />
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
