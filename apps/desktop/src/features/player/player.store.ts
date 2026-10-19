import { create } from "zustand";
import type { Track } from "@/types";
import { createMixerActions } from "./player.actions.mixer";
import { createQueueActions } from "./player.actions.queue";
import { createTransportActions } from "./player.actions.transport";
import { loadPlayerPrefs } from "./player.prefs";
import type { PlayerState } from "./player.types";

export const usePlayer = create<PlayerState>((set, get) => ({
  queue: [],
  index: -1,
  playing: false,
  buffering: false,
  positionMs: 0,
  durationMs: 0,
  ...loadPlayerPrefs(),
  muted: false,
  error: null,
  queueOpen: false,
  ...createTransportActions(set, get),
  ...createMixerActions(set),
  ...createQueueActions(set),
}));

export const useCurrentTrack = (): Track | null =>
  usePlayer((state) => state.queue[state.index] ?? null);
