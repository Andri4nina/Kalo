import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { IconButton } from "@/components/IconButton";
import { removeTrack } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import type { Track } from "@/types";
import { useLibraryVersion } from "./library.store";

export function RemoveTrackButton({ track }: { track: Track }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);
  const confirm = async () => {
    setBusy(true);
    setError(null);
    try {
      await removeTrack(track.id);
      bump();
      setOpen(false);
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };
  const close = () => {
    setOpen(false);
    setError(null);
  };
  return (
    <>
      <IconButton icon={Trash2} label="Retirer de la bibliothèque" size="sm" onClick={() => setOpen(true)} />
      <ConfirmModal
        open={open}
        title="Retirer de la bibliothèque"
        description={`« ${track.title} » sera retiré de l'index, des playlists et des favoris. Le fichier audio reste sur le disque.`}
        confirmLabel="Retirer"
        busyLabel="Retrait..."
        busy={busy}
        error={error}
        onConfirm={() => void confirm()}
        onClose={close}
      />
    </>
  );
}
