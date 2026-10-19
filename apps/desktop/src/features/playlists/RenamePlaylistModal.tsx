import { useState } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { TextField } from "@/components/TextField";
import { useLibraryVersion } from "@/features/library/library.store";
import { renamePlaylist } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";
import type { Playlist } from "@/types";

interface Props {
  playlist: Playlist;
  open: boolean;
  onClose: () => void;
}

export function RenamePlaylistModal({ playlist, open, onClose }: Props) {
  const [name, setName] = useState(playlist.name);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const submit = async () => {
    if (!name.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await renamePlaylist(playlist.id, name.trim());
      bump();
      onClose();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal open={open} title="Renommer la playlist" onClose={onClose}>
      {error ? <p className="mb-3 text-xs text-kalo-danger dark:text-kalo-dark-danger">{error}</p> : null}
      <TextField label="Nom" value={name} onChange={(event) => setName(event.target.value)} maxLength={80} />
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={busy}>Annuler</Button>
        <Button size="sm" onClick={() => void submit()} disabled={busy || name.trim().length === 0}>Enregistrer</Button>
      </div>
    </Modal>
  );
}
