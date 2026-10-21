import type { Track } from "@/types";

export const MAX_HISTORY = 30;

/// Keeps the track that was playing before a queue move, most recent first.
export function pushHistory(history: Track[], current: Track | undefined): Track[] {
  if (!current) return history;
  return [current, ...history].slice(0, MAX_HISTORY);
}
