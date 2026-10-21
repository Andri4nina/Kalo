import type { Track } from "@/types";
import { pushHistory } from "./player.history";
import type { PlayerGet, PlayerSet } from "./player.store.types";

export interface HistoryActions {
  replayHistory: (track: Track) => void;
}

export function createHistoryActions(set: PlayerSet, get: PlayerGet): HistoryActions {
  return {
    replayHistory: (track) => {
      const state = get();
      const found = state.queue.findIndex((item) => item.id === track.id);
      const history = pushHistory(state.history, state.queue[state.index]);
      if (found >= 0) {
        set({ index: found, playing: true, positionMs: 0, resumePositionMs: 0, error: null, history });
        return;
      }
      set({
        queue: [...state.queue, track],
        index: state.queue.length,
        playing: true,
        positionMs: 0,
        resumePositionMs: 0,
        error: null,
        history,
        queueSource: "Historique",
      });
    },
  };
}
