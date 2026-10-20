import { invoke } from "@tauri-apps/api/core";
import type { AlbumSummary, ArtistSummary, TrackPage } from "@/types";

export const listArtists = (search: string | null = null) =>
  invoke<ArtistSummary[]>("library_artists", { search });

export const listAlbums = (search: string | null = null) =>
  invoke<AlbumSummary[]>("library_albums", { search });

export const getArtist = (artistId: number) => invoke<ArtistSummary | null>("artist_get", { artistId });

export const getAlbum = (albumId: number) => invoke<AlbumSummary | null>("album_get", { albumId });

export const listArtistTracks = (artistId: number, limit: number, offset: number) =>
  invoke<TrackPage>("artist_tracks", { artistId, limit, offset });

export const listAlbumTracks = (albumId: number, limit: number, offset: number) =>
  invoke<TrackPage>("album_tracks", { albumId, limit, offset });
