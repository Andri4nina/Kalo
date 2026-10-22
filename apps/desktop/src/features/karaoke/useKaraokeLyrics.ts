import { useMemo } from "react";
import { readLyrics } from "@/lib/api/lyrics";
import { useAsync } from "@/lib/useAsync";
import type { Track } from "@/types";
import { parseLrc } from "./lrc";

/** Paroles du morceau courant : source brute et lignes synchronisées. */
export function useKaraokeLyrics(track: Track | null) {
  const { data, loading, error, reload } = useAsync(
    () => (track ? readLyrics(track.id) : Promise.resolve(null)),
    [track?.id],
  );
  const lines = useMemo(() => parseLrc(data?.content ?? ""), [data]);
  const plainText = lines.length === 0 ? (data?.content.trim() ?? "") : "";
  return { source: data ?? null, lines, plainText, loading, error, reload };
}

export type KaraokeLyrics = ReturnType<typeof useKaraokeLyrics>;
