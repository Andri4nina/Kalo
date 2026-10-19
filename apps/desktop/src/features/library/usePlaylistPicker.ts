import { useEffect, useState } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { addTrackToPlaylist, createPlaylist, listPlaylists } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";
import type { Playlist } from "@/types";

export function usePlaylistPicker(open: boolean, trackId: number, onDone: () => void) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  useEffect(() => {
    if (!open) return;
    setError(null);
    listPlaylists().then(setPlaylists).catch((reason: unknown) => setError(errorMessage(reason)));
  }, [open]);

  const attach = async (playlistId: number) => {
    setBusy(true);
    try {
      await addTrackToPlaylist(playlistId, trackId);
      bump();
      onDone();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  const createAndAttach = async (name: string) => {
    if (!name.trim()) return;
    setBusy(true);
    try {
      const playlist = await createPlaylist(name.trim());
      await addTrackToPlaylist(playlist.id, trackId);
      bump();
      onDone();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return { playlists, busy, error, attach, createAndAttach };
}
