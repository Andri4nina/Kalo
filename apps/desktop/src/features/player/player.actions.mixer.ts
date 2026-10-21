import { savePlayerPrefs } from "./player.prefs";
import type { PlayerSet } from "./player.store.types";

export interface MixerActions {
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
  setError: (error: string | null) => void;
}

export function createMixerActions(set: PlayerSet): MixerActions {
  return {
    setPlaying: (playing) => set({ playing }),
    setBuffering: (buffering) => set({ buffering }),
    setPosition: (positionMs) => set({ positionMs }),
    setDuration: (durationMs) => set({ durationMs }),
    setVolume: (volume) => {
      savePlayerPrefs({ volume });
      set({ volume });
    },
    setBalance: (balance) => {
      savePlayerPrefs({ balance });
      set({ balance });
    },
    toggleMute: () => set((state) => ({ muted: !state.muted })),
    toggleShuffle: () =>
      set((state) => {
        savePlayerPrefs({ shuffle: !state.shuffle });
        return { shuffle: !state.shuffle };
      }),
    cycleRepeat: () =>
      set((state) => {
        const repeat = state.repeat === "off" ? "all" : state.repeat === "all" ? "one" : "off";
        savePlayerPrefs({ repeat });
        return { repeat };
      }),
    setResumeOnLaunch: (resumeOnLaunch) => {
      savePlayerPrefs({ resumeOnLaunch });
      set({ resumeOnLaunch });
    },
    setError: (error) => set({ error }),
  };
}
