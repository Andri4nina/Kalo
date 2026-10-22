import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLibraryVersion } from "@/features/library/library.store";
import { duplicatePlaylist } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";

/** Duplique une playlist puis ouvre la copie. */
export function usePlaylistDuplicate(playlistId: number) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);
  const navigate = useNavigate();

  const duplicate = async () => {
    setBusy(true);
    setError(null);
    try {
      const copy = await duplicatePlaylist(playlistId);
      bump();
      navigate(`/playlists/${copy.id}`);
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return { busy, error, duplicate };
}
