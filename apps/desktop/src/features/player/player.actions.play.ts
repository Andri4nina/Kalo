import type { Track } from "@/types";
import { pushHistory } from "./player.history";
import type { PlayerSet } from "./player.store.types";

export interface PlayActions {
  playQueue: (tracks: Track[], startIndex?: number, source?: string | null) => void;
  playTrack: (track: Track, source?: Track[], sourceLabel?: string | null) => void;
}

export function createPlayActions(set: PlayerSet): PlayActions {
  return {
    playQueue: (tracks, startIndex = 0, source = null) => {
      if (tracks.length === 0) return;
      const index = Math.min(Math.max(startIndex, 0), tracks.length - 1);
      set((state) => ({
        queue: tracks,
        index,
        playing: true,
        positionMs: 0,
        resumePositionMs: 0,
        error: null,
        queueSource: source,
        history: pushHistory(state.history, state.queue[state.index]),
      }));
    },
    playTrack: (track, source, sourceLabel = null) => {
      const queue = source?.length ? source : [track];
      const found = queue.findIndex((item) => item.id === track.id);
      set((state) => ({
        queue,
        index: found < 0 ? 0 : found,
        playing: true,
        positionMs: 0,
        resumePositionMs: 0,
        error: null,
        queueSource: sourceLabel,
        history: pushHistory(state.history, state.queue[state.index]),
      }));
    },
  };
}
