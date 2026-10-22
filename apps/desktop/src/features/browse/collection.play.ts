import { listAlbumTracks, listArtistTracks } from "@/lib/api/browse";
import { getPlaylist } from "@/lib/api/playlists";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { DETAIL_PAGE_SIZE } from "./useBrowseDetail";

/** Lance une collection depuis le début en écartant les fichiers introuvables. */
export function startCollection(tracks: Track[], source: string): boolean {
  const playable = tracks.filter((track) => !track.isMissing);
  const player = usePlayer.getState();
  if (playable.length === 0) {
    player.setError(`Aucun morceau lisible dans « ${source} ».`);
    return false;
  }
  player.playQueue(playable, 0, source);
  return true;
}

/** Premiers morceaux d'un album ou d'un artiste (une page de détail). */
export const albumTracks = (albumId: number) =>
  listAlbumTracks(albumId, DETAIL_PAGE_SIZE, 0).then((page) => page.items);

export const artistTracks = (artistId: number) =>
  listArtistTracks(artistId, DETAIL_PAGE_SIZE, 0).then((page) => page.items);

export const playlistTracks = (playlistId: number) =>
  getPlaylist(playlistId).then((detail) => detail.tracks);
