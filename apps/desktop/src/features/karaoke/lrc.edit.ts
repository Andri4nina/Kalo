import { parseLrc } from "./lrc";

/** Ligne en cours de synchronisation : sans horodatage tant qu'elle n'est pas marquée. */
export interface EditLine {
  text: string;
  timeMs: number | null;
}

/** Texte collé ou LRC existant : une ligne par ligne non vide. */
export function prepare(raw: string): EditLine[] {
  const synced = parseLrc(raw);
  if (synced.length > 0) return synced.map(({ text, timeMs }) => ({ text, timeMs }));
  return raw
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((text) => ({ text, timeMs: null }));
}

export function stamp(lines: EditLine[], index: number, timeMs: number): EditLine[] {
  return lines.map((line, position) => (position === index ? { ...line, timeMs: Math.max(0, Math.round(timeMs)) } : line));
}

export function nudge(lines: EditLine[], index: number, deltaMs: number): EditLine[] {
  return lines.map((line, position) =>
    position === index && line.timeMs !== null ? { ...line, timeMs: Math.max(0, line.timeMs + deltaMs) } : line,
  );
}

export const nextUnstamped = (lines: EditLine[]) => lines.findIndex((line) => line.timeMs === null);

export const isComplete = (lines: EditLine[]) => lines.length > 0 && nextUnstamped(lines) === -1;
