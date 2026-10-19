import type { PlayerState, RepeatMode } from "./player.types";

interface QueueState {
  queue: PlayerState["queue"];
  index: number;
  shuffle: boolean;
  repeat: RepeatMode;
}

export function nextIndex(state: QueueState): number | null {
  if (state.queue.length === 0) return null;
  if (state.shuffle) {
    if (state.queue.length === 1) return 0;
    const pick = Math.floor(Math.random() * (state.queue.length - 1));
    return pick >= state.index ? pick + 1 : pick;
  }
  const next = state.index + 1;
  if (next < state.queue.length) return next;
  return state.repeat === "all" ? 0 : null;
}

export function previousIndex(state: QueueState): number {
  if (state.index > 0) return state.index - 1;
  return state.repeat === "all" ? Math.max(state.queue.length - 1, 0) : 0;
}
