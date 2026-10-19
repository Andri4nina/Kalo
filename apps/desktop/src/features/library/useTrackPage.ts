import type { TrackQuery, TrackSort } from "@/types";
import { listTracks } from "@/lib/api/library";
import { useLibraryVersion } from "./library.store";
import { useAsync } from "@/lib/useAsync";

interface Params {
  search: string;
  sort: TrackSort;
  page: number;
  pageSize?: number;
  favoritesOnly?: boolean;
  playlistId?: number | null;
}

export function useTrackPage(params: Params) {
  const version = useLibraryVersion((state) => state.version);
  const pageSize = params.pageSize ?? 100;
  const query: TrackQuery = {
    search: params.search.trim() || null,
    sort: params.sort,
    favoritesOnly: params.favoritesOnly ?? false,
    playlistId: params.playlistId ?? null,
    limit: pageSize,
    offset: params.page * pageSize,
  };
  return useAsync(
    () => listTracks(query),
    [query.search, query.sort, query.favoritesOnly, query.playlistId, query.limit, query.offset, version],
  );
}

export function pageCount(total: number, pageSize = 100): number {
  return Math.max(1, Math.ceil(total / pageSize));
}
