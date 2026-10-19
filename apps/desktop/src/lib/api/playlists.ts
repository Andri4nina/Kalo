import { invoke } from "@tauri-apps/api/core";
import type { Playlist, PlaylistDetail } from "@/types";

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

export const reorderPlaylist = (playlistId: number, trackIds: number[]) =>
  invoke<void>("playlist_reorder", { playlistId, trackIds });
