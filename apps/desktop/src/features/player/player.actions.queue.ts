import type { QueueActions, PlayerSet } from "./player.store.types";

export function createQueueActions(set: PlayerSet): QueueActions {
  return {
    enqueue: (track) =>
      set((state) => ({
        queue: [...state.queue, track],
        index: state.index < 0 ? 0 : state.index,
      })),
    removeFromQueue: (index) =>
      set((state) => {
        if (index < 0 || index >= state.queue.length) return state;
        const queue = state.queue.filter((_, position) => position !== index);
        const current = state.index > index ? state.index - 1 : state.index;
        return { queue, index: Math.min(current, queue.length - 1) };
      }),
    patchTrack: (trackId, patch) =>
      set((state) => ({
        queue: state.queue.map((track) => (track.id === trackId ? { ...track, ...patch } : track)),
      })),
    clearQueue: () =>
      set({ queue: [], index: -1, playing: false, positionMs: 0, resumePositionMs: 0, durationMs: 0, history: [], queueSource: null }),
    playNext: (track) =>
      set((state) => ({
        queue: [...state.queue.slice(0, state.index + 1), track, ...state.queue.slice(state.index + 1)],
        index: state.index < 0 ? 0 : state.index,
      })),
    moveInQueue: (from, to) =>
      set((state) => {
        if (from === to || from < 0 || from >= state.queue.length || to < 0 || to >= state.queue.length) return state;
        const moved = state.queue[from];
        if (!moved) return state;
        const queue = [...state.queue];
        queue.splice(from, 1);
        queue.splice(to, 0, moved);
        const index = state.index === from ? to : state.index > from && state.index <= to ? state.index - 1 : state.index < from && state.index >= to ? state.index + 1 : state.index;
        return { queue, index };
      }),
    setQueueOpen: (queueOpen) => set({ queueOpen }),
  };
}
