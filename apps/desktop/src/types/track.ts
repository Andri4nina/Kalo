export type TrackSort = "title" | "artist" | "album" | "added" | "duration" | "year";

export interface Track {
  id: number;
  path: string;
  title: string;
  artist: string | null;
  album: string | null;
  genre: string | null;
  year: number | null;
  durationMs: number;
  format: string;
  coverPath: string | null;
  favorite: boolean;
  isMissing: boolean;
  addedAt: number;
}

export interface TrackQuery {
  search: string | null;
  sort: TrackSort;
  favoritesOnly: boolean;
  playlistId: number | null;
  limit: number;
  offset: number;
}

export interface TrackPage {
  items: Track[];
  total: number;
}
