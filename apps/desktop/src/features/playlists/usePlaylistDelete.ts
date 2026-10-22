import { useState } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { deletePlaylist } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";
import type { Playlist } from "@/types";

/** Suppression confirmée d'une playlist ; les fichiers audio ne sont jamais touchés. */
export function usePlaylistDelete() {
  const [toDelete, setToDelete] = useState<Playlist | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const remove = async () => {
    if (!toDelete) return;
    setBusy(true);
    setError(null);
    try {
      await deletePlaylist(toDelete.id);
      setToDelete(null);
      bump();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return { toDelete, setToDelete, busy, error, remove };
}
