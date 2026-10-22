import { useState } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { renamePlaylist, updatePlaylistDetails } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";
import type { Playlist } from "@/types";

/** Nom et description d'une playlist : seuls les champs modifiés sont envoyés. */
export function usePlaylistDetailsForm(playlist: Playlist, onDone: () => void) {
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const submit = async () => {
    if (!name.trim()) return;
    setBusy(true);
    setError(null);
    try {
      if (name.trim() !== playlist.name) await renamePlaylist(playlist.id, name.trim());
      if (description.trim() !== playlist.description) await updatePlaylistDetails(playlist.id, description);
      bump();
      onDone();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return { name, setName, description, setDescription, busy, error, submit };
}
