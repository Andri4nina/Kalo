import { useLibraryVersion } from "@/features/library/library.store";
import { listAlbums, listArtists } from "@/lib/api/browse";
import { useAsync } from "@/lib/useAsync";

export function useArtists(search = "") {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(() => listArtists(search.trim() || null), [search, version]);
}

export function useAlbums(search = "") {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(() => listAlbums(search.trim() || null), [search, version]);
}
