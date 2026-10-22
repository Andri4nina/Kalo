import { useState } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { setPlaylistCover } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";
import { pickImage } from "@/lib/pickImage";
import type { Playlist } from "@/types";

/** Choix (copie dans le cache) ou retrait de la pochette d'une playlist. */
export function usePlaylistCover(playlist: Playlist) {
  const [cover, setCover] = useState(playlist.coverPath);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const apply = async (source: string | null) => {
    setBusy(true);
    setError(null);
    try {
      setCover((await setPlaylistCover(playlist.id, source)).coverPath);
      bump();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };
  const choose = async () => {
    const source = await pickImage();
    if (source) await apply(source);
  };

  return { cover, busy, error, choose, clear: () => apply(null) };
}
