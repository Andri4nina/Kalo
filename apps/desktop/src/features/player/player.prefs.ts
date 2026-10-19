import type { RepeatMode } from "./player.types";

interface PlayerPrefs {
  volume: number;
  balance: number;
  shuffle: boolean;
  repeat: RepeatMode;
}

const FALLBACK: PlayerPrefs = { volume: 0.8, balance: 0, shuffle: false, repeat: "off" };
const KEY = "kalo:player-prefs";

export function loadPlayerPrefs(): PlayerPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return FALLBACK;
    const parsed = JSON.parse(raw) as Partial<PlayerPrefs>;
    return { ...FALLBACK, ...parsed };
  } catch {
    return FALLBACK;
  }
}

export function savePlayerPrefs(patch: Partial<PlayerPrefs>): void {
  localStorage.setItem(KEY, JSON.stringify({ ...loadPlayerPrefs(), ...patch }));
}
