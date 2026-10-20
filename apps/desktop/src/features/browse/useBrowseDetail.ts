import { useLibraryVersion } from "@/features/library/library.store";
import { getAlbum, getArtist, listAlbumTracks, listArtistTracks } from "@/lib/api/browse";
import { useAsync } from "@/lib/useAsync";

export const DETAIL_PAGE_SIZE = 100;

function offsetOf(page: number): number {
  return page * DETAIL_PAGE_SIZE;
}

export function useArtist(artistId: number) {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(() => getArtist(artistId), [artistId, version]);
}

export function useAlbum(albumId: number) {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(() => getAlbum(albumId), [albumId, version]);
}

export function useArtistTracks(artistId: number, page: number) {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(
    () => listArtistTracks(artistId, DETAIL_PAGE_SIZE, offsetOf(page)),
    [artistId, page, version],
  );
}

export function useAlbumTracks(albumId: number, page: number) {
  const version = useLibraryVersion((state) => state.version);
  return useAsync(
    () => listAlbumTracks(albumId, DETAIL_PAGE_SIZE, offsetOf(page)),
    [albumId, page, version],
  );
}
