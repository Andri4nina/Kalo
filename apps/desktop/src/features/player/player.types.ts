import type { Track } from "@/types";

export type RepeatMode = "off" | "all" | "one";

export interface PlayerState {
  queue: Track[];
  index: number;
  resumePositionMs: number;
  playing: boolean;
  buffering: boolean;
  positionMs: number;
  durationMs: number;
  volume: number;
  balance: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  resumeOnLaunch: boolean;
  error: string | null;
  queueOpen: boolean;
  playQueue: (tracks: Track[], startIndex?: number) => void;
  playTrack: (track: Track, source?: Track[]) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  advance: () => void;
  jumpTo: (index: number) => void;
  setPlaying: (playing: boolean) => void;
  setBuffering: (buffering: boolean) => void;
  setPosition: (positionMs: number) => void;
  setDuration: (durationMs: number) => void;
  setVolume: (volume: number) => void;
  setBalance: (balance: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setResumeOnLaunch: (value: boolean) => void;
  enqueue: (track: Track) => void;
  playNext: (track: Track) => void;
  moveInQueue: (from: number, to: number) => void;
  removeFromQueue: (index: number) => void;
  patchTrack: (trackId: number, patch: Partial<Track>) => void;
  clearQueue: () => void;
  setQueueOpen: (open: boolean) => void;
  setError: (error: string | null) => void;
}
