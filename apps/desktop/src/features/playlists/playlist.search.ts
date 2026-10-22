import type { Playlist, Track } from "@/types";

/** Minuscules sans accents, pour une recherche tolérante. */
export function normalize(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

function matches(fields: Array<string | null>, query: string): boolean {
  const needle = normalize(query);
  if (!needle) return true;
  return fields.some((field) => field !== null && normalize(field).includes(needle));
}

export function filterPlaylists(playlists: Playlist[], query: string): Playlist[] {
  return playlists.filter((playlist) => matches([playlist.name, playlist.description], query));
}

export interface PlaylistRow {
  track: Track;
  index: number;
}

/** Lignes visibles avec leur position d'origine dans la playlist. */
export function filterRows(tracks: Track[], query: string): PlaylistRow[] {
  return tracks
    .map((track, index) => ({ track, index }))
    .filter(({ track }) => matches([track.title, track.artist, track.album], query));
}
