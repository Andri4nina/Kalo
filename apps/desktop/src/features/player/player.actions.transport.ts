import { nextIndex, previousIndex } from "./player.queue";
import { pushHistory } from "./player.history";
import type { PlayerState } from "./player.types";
import type { PlayerGet, PlayerSet } from "./player.store.types";

export interface TransportActions {
  toggle: () => void;
  next: () => void;
  previous: () => void;
  advance: () => void;
  jumpTo: (index: number) => void;
}

function moved(state: PlayerState, index: number) {
  return { index, positionMs: 0, history: pushHistory(state.history, state.queue[state.index]) };
}

export function createTransportActions(set: PlayerSet, get: PlayerGet): TransportActions {
  return {
    toggle: () => {
      if (get().queue.length > 0) set((state) => ({ playing: !state.playing }));
    },
    next: () => {
      const index = nextIndex(get());
      if (index !== null) set((state) => moved(state, index));
    },
    previous: () => {
      if (get().queue.length === 0) return;
      set((state) => moved(state, previousIndex(state)));
    },
    advance: () => {
      const index = nextIndex(get());
      if (index === null) set({ playing: false });
      else set((state) => moved(state, index));
    },
    jumpTo: (index) => {
      const state = get();
      if (index < 0 || index >= state.queue.length || index === state.index) return;
      set((current) => ({ ...moved(current, index), playing: true, error: null }));
    },
  };
}
