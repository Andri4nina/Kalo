import { useState } from "react";
import { updateTrack } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import type { Track } from "@/types";
import { useLibraryVersion } from "./library.store";

export function useEditTrack(track: Track, onClose: () => void) {
  const [title, setTitle] = useState(track.title);
  const [artist, setArtist] = useState(track.artist ?? "");
  const [album, setAlbum] = useState(track.album ?? "");
  const [genre, setGenre] = useState(track.genre ?? "");
  const [year, setYear] = useState(track.year?.toString() ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      await updateTrack({
        trackId: track.id,
        title: title.trim(),
        artist: artist.trim(),
        album: album.trim() || null,
        genre: genre.trim() || null,
        year: year.trim() ? Number(year) : null,
      });
      bump();
      onClose();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return { title, setTitle, artist, setArtist, album, setAlbum, genre, setGenre, year, setYear, busy, error, submit, valid: title.trim().length > 0 && artist.trim().length > 0 };
}