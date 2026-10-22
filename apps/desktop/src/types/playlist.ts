import type { Track } from "@/types/track";

export interface Playlist {
  id: number;
  name: string;
  description: string;
  coverPath: string | null;
  trackCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface PlaylistDetail {
  playlist: Playlist;
  tracks: Track[];
}
