import type { Track } from "@/types";

export interface PlayerSession {
  queue: Track[];
  index: number;
}

const KEY = "kalo:player-session";
const MAX_QUEUE = 500;

function isTrack(value: unknown): value is Track {
  const candidate = value as Partial<Track> | null;
  return Boolean(candidate) && typeof candidate?.id === "number" && typeof candidate.path === "string" && typeof candidate.title === "string";
}

export function loadPlayerSession(): PlayerSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PlayerSession>;
    const queue = Array.isArray(parsed.queue) ? parsed.queue.filter(isTrack).slice(0, MAX_QUEUE) : [];
    if (queue.length === 0) return null;
    const index = typeof parsed.index === "number" && parsed.index >= 0 && parsed.index < queue.length ? parsed.index : 0;
    return { queue, index };
  } catch {
    return null;
  }
}

export function persistPlayerSession(queue: Track[], index: number): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ queue: queue.slice(0, MAX_QUEUE), index }));
  } catch {
    // Stockage local indisponible : la session n'est simplement pas conservée.
  }
}
