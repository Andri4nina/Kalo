import { useState } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { removeTrackFromPlaylist, reorderPlaylist } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";
import type { Track } from "@/types";

export function usePlaylistEditor(playlistId: number, tracks: Track[]) {
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const run = async (action: () => Promise<void>) => {
    setError(null);
    try {
      await action();
      bump();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    }
  };

  const move = (from: number, direction: -1 | 1) => {
    const to = from + direction;
    if (to < 0 || to >= tracks.length) return;
    const ids = tracks.map((track) => track.id);
    const moved = ids[from];
    const target = ids[to];
    if (moved === undefined || target === undefined) return;
    ids[from] = target;
    ids[to] = moved;
    void run(() => reorderPlaylist(playlistId, ids));
  };

  const remove = (trackId: number) => {
    void run(() => removeTrackFromPlaylist(playlistId, trackId));
  };

  return { error, move, remove };
}
