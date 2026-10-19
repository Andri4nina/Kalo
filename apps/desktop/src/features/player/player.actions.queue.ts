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
      set({ queue: [], index: -1, playing: false, positionMs: 0, durationMs: 0 }),
    setQueueOpen: (queueOpen) => set({ queueOpen }),
  };
}
