import type { Track } from "@/types";
import { nextIndex, previousIndex } from "./player.queue";
import type { PlayerGet, PlayerSet } from "./player.store.types";

export interface TransportActions {
  playQueue: (tracks: Track[], startIndex?: number) => void;
  playTrack: (track: Track, source?: Track[]) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  advance: () => void;
  jumpTo: (index: number) => void;
}

export function createTransportActions(set: PlayerSet, get: PlayerGet): TransportActions {
  return {
    playQueue: (tracks, startIndex = 0) => {
      if (tracks.length === 0) return;
      const index = Math.min(Math.max(startIndex, 0), tracks.length - 1);
      set({ queue: tracks, index, playing: true, positionMs: 0, resumePositionMs: 0, error: null });
    },
    playTrack: (track, source) => {
      const queue = source?.length ? source : [track];
      const found = queue.findIndex((item) => item.id === track.id);
      set({ queue, index: found < 0 ? 0 : found, playing: true, positionMs: 0, resumePositionMs: 0, error: null });
    },
    toggle: () => {
      if (get().queue.length > 0) set((state) => ({ playing: !state.playing }));
    },
    next: () => {
      const index = nextIndex(get());
      if (index !== null) set({ index, positionMs: 0 });
    },
    previous: () => {
      if (get().queue.length === 0) return;
      set({ index: previousIndex(get()), positionMs: 0 });
    },
    advance: () => {
      const index = nextIndex(get());
      if (index === null) set({ playing: false });
      else set({ index, positionMs: 0 });
    },
    jumpTo: (index) => {
      const state = get();
      if (index < 0 || index >= state.queue.length) return;
      set({ index, positionMs: 0, playing: true, error: null });
    },
  };
}
