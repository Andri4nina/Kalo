import { invoke } from "@tauri-apps/api/core";
import type { ImportSummary, Playlist, PlaylistDetail } from "@/types";

export const listPlaylists = () => invoke<Playlist[]>("playlist_list");

export const createPlaylist = (name: string) =>
  invoke<Playlist>("playlist_create", { name });

export const renamePlaylist = (playlistId: number, name: string) =>
  invoke<Playlist>("playlist_rename", { playlistId, name });

export const deletePlaylist = (playlistId: number) =>
  invoke<void>("playlist_delete", { playlistId });

export const getPlaylist = (playlistId: number) =>
  invoke<PlaylistDetail>("playlist_detail", { playlistId });

export const addTrackToPlaylist = (playlistId: number, trackId: number) =>
  invoke<void>("playlist_add_track", { playlistId, trackId });

export const removeTrackFromPlaylist = (playlistId: number, trackId: number) =>
  invoke<void>("playlist_remove_track", { playlistId, trackId });

export const removeTracksFromPlaylist = (playlistId: number, trackIds: number[]) =>
  invoke<void>("playlist_remove_tracks", { playlistId, trackIds });

export const reorderPlaylist = (playlistId: number, trackIds: number[]) =>
  invoke<void>("playlist_reorder", { playlistId, trackIds });

export const exportPlaylistM3u = (playlistId: number, destination: string) =>
  invoke<void>("playlist_export_m3u", { playlistId, destination });

export const importPlaylistM3u = (playlistId: number, source: string) =>
  invoke<ImportSummary>("playlist_import_m3u", { playlistId, source });
