import type { Track } from "./track";

export interface DuplicateGroup {
  key: string;
  title: string;
  artist: string | null;
  tracks: Track[];
}