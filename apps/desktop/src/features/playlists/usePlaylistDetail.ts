import { useLibraryVersion } from "@/features/library/library.store";
import { getPlaylist } from "@/lib/api/playlists";
import { useAsync } from "@/lib/useAsync";

export function usePlaylistDetail(playlistId: number) {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(
    () =>
      Number.isInteger(playlistId) && playlistId > 0
        ? getPlaylist(playlistId)
        : Promise.reject(new Error("Playlist introuvable")),
    [playlistId, version],
  );
}
