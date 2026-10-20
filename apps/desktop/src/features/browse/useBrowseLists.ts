import { useLibraryVersion } from "@/features/library/library.store";
import { listAlbums, listArtists } from "@/lib/api/browse";
import { useAsync } from "@/lib/useAsync";

export function useArtists() {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(listArtists, [version]);
}

export function useAlbums() {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(listAlbums, [version]);
}
