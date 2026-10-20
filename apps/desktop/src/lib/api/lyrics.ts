import { invoke } from "@tauri-apps/api/core";
import { isTauri } from "@/lib/assets";

export const readLyrics = (trackId: number): Promise<string | null> =>
  isTauri() ? invoke<string | null>("track_lyrics", { trackId }) : Promise.resolve(null);
