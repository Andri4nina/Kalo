import { ListPlus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { ConfirmModal } from "@/components/ConfirmModal";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";

interface Props {
  tracks: Track[];
  error: string | null;
  onRemove: () => Promise<boolean>;
  onClear: () => void;
}

export function PlaylistBatchBar({ tracks, error, onRemove, onClear }: Props) {
  const enqueue = usePlayer((state) => state.enqueue);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const enqueueAll = () => { for (const track of tracks) if (!track.isMissing) enqueue(track); onClear(); };
  const remove = async () => {
    setBusy(true);
    const ok = await onRemove();
    setBusy(false);
    if (ok) { setConfirm(false); onClear(); }
  };
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg bg-kalo-card p-3 dark:bg-kalo-dark-card">
        <span className="mr-2 text-xs font-medium">{tracks.length} sélectionné(s)</span>
        <Button size="sm" variant="subtle" onClick={enqueueAll}><ListPlus size={14} aria-hidden /> Ajouter à la file</Button>
        <Button size="sm" variant="danger" onClick={() => setConfirm(true)}><Trash2 size={14} aria-hidden /> Retirer de la playlist</Button>
        <Button size="sm" variant="ghost" onClick={onClear}><X size={14} aria-hidden /> Effacer</Button>
      </div>
      <ConfirmModal
        open={confirm}
        title="Retirer de la playlist ?"
        description={`${tracks.length} morceau(x) seront retirés de cette playlist. Les fichiers audio restent sur le disque.`}
        confirmLabel="Retirer"
        busyLabel="Retrait..."
        busy={busy}
        error={error}
        onConfirm={() => void remove()}
        onClose={() => setConfirm(false)}
      />
    </>
  );
}
