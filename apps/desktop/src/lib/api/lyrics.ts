import { invoke } from "@tauri-apps/api/core";
import { isTauri } from "@/lib/assets";
import type { LyricsSource } from "@/types";

export const readLyrics = (trackId: number): Promise<LyricsSource | null> =>
  isTauri() ? invoke<LyricsSource | null>("track_lyrics", { trackId }) : Promise.resolve(null);

export const saveLyrics = (trackId: number, content: string) => invoke<void>("lyrics_save", { trackId, content });

export const resetLyrics = (trackId: number) => invoke<boolean>("lyrics_reset", { trackId });

export const exportLyrics = (content: string, destination: string) =>
  invoke<void>("lyrics_export", { content, destination });
