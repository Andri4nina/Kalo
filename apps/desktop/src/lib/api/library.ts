import { invoke } from "@tauri-apps/api/core";
import type { DuplicateGroup, LibraryRoot, LibraryStats, ScanSummary, TrackPage, TrackQuery, TrackUpdate } from "@/types";

export const listRoots = () => invoke<LibraryRoot[]>("library_roots");

export const addRoot = (path: string) => invoke<LibraryRoot>("library_add_root", { path });

export const removeRoot = (rootId: number) => invoke<void>("library_remove_root", { rootId });

export const scanRoot = (rootId: number) => invoke<ScanSummary>("library_scan", { rootId });

export const listTracks = (query: TrackQuery) => invoke<TrackPage>("library_tracks", { query });

export const updateTrack = (input: TrackUpdate) =>
  invoke<void>("library_update_track", {
    trackId: input.trackId,
    title: input.title,
    artist: input.artist,
    album: input.album,
    genre: input.genre,
    year: input.year,
  });

export const relocateTrack = (trackId: number, newPath: string) =>
  invoke<void>("library_relocate_track", { trackId, newPath });

export const removeTrack = (trackId: number) => invoke<void>("library_remove_track", { trackId });

export const setTrackCover = (trackId: number, source: string) =>
  invoke<string>("library_set_cover", { trackId, source });

export const getStats = () => invoke<LibraryStats>("library_stats");

export const listFormats = () => invoke<string[]>("library_formats");

export const listDuplicates = () => invoke<DuplicateGroup[]>("library_duplicates");

export const getRecent = (limit = 6) => invoke<TrackPage>("history_recent", { limit });
