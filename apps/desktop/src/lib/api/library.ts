import { invoke } from "@tauri-apps/api/core";
import type { LibraryRoot, LibraryStats, ScanSummary, TrackPage, TrackQuery } from "@/types";

export const listRoots = () => invoke<LibraryRoot[]>("library_roots");

export const addRoot = (path: string) => invoke<LibraryRoot>("library_add_root", { path });

export const removeRoot = (rootId: number) => invoke<void>("library_remove_root", { rootId });

export const scanRoot = (rootId: number) => invoke<ScanSummary>("library_scan", { rootId });

export const listTracks = (query: TrackQuery) => invoke<TrackPage>("library_tracks", { query });

export const getStats = () => invoke<LibraryStats>("library_stats");

export const getRecent = (limit = 6) => invoke<TrackPage>("history_recent", { limit });
