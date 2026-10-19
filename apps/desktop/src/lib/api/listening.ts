import { invoke } from "@tauri-apps/api/core";
import type { TrackPage } from "@/types";

export const toggleFavorite = (trackId: number) =>
  invoke<boolean>("favorites_toggle", { trackId });

export const recordPlay = (trackId: number) =>
  invoke<void>("history_record", { trackId });

export const listFavorites = (limit: number, offset: number) =>
  invoke<TrackPage>("favorites_list", { limit, offset });
