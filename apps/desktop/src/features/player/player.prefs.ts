import type { RepeatMode } from "./player.types";

interface PlayerPrefs {
  volume: number;
  balance: number;
  shuffle: boolean;
  repeat: RepeatMode;
  resumeOnLaunch: boolean;
}

const FALLBACK: PlayerPrefs = { volume: 0.8, balance: 0, shuffle: false, repeat: "off", resumeOnLaunch: true };
const KEY = "kalo:player-prefs";

function bound(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, value));
}

function repeatMode(value: unknown): RepeatMode {
  return value === "all" || value === "one" ? value : FALLBACK.repeat;
}

export function loadPlayerPrefs(): PlayerPrefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return FALLBACK;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      volume: bound(parsed.volume, FALLBACK.volume, 0, 1),
      balance: bound(parsed.balance, FALLBACK.balance, -1, 1),
      shuffle: typeof parsed.shuffle === "boolean" ? parsed.shuffle : FALLBACK.shuffle,
      repeat: repeatMode(parsed.repeat),
      resumeOnLaunch: typeof parsed.resumeOnLaunch === "boolean" ? parsed.resumeOnLaunch : FALLBACK.resumeOnLaunch,
    };
  } catch {
    return FALLBACK;
  }
}

export function savePlayerPrefs(patch: Partial<PlayerPrefs>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...loadPlayerPrefs(), ...patch }));
  } catch {
    // Stockage local indisponible : les préférences restent en mémoire.
  }
}
