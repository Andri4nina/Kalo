import type { Track } from "@/types";

export function track(id: number, title = `Titre ${id}`): Track {
  return {
    id,
    path: `C:/Music/${id}.mp3`,
    title,
    artist: "Artiste",
    album: "Album",
    genre: null,
    year: 2026,
    durationMs: 180_000,
    format: "MP3",
    coverPath: null,
    favorite: false,
    isMissing: false,
    addedAt: 1_700_000_000,
  };
}

export function tracks(count: number): Track[] {
  return Array.from({ length: count }, (_, index) => track(index + 1));
}
