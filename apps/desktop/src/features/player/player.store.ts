import { create } from "zustand";
import type { Track } from "@/types";
import { createMixerActions } from "./player.actions.mixer";
import { createQueueActions } from "./player.actions.queue";
import { createTransportActions } from "./player.actions.transport";
import { loadPlayerPrefs } from "./player.prefs";
import { loadPlayerSession } from "./player.session.storage";
import type { PlayerState } from "./player.types";

const session = loadPlayerSession();

export const usePlayer = create<PlayerState>((set, get) => ({
  queue: session?.queue ?? [],
  index: session?.index ?? -1,
  resumePositionMs: session?.positionMs ?? 0,
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
