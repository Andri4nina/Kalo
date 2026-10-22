export interface Video {
  id: number;
  path: string;
  title: string;
  artist: string | null;
  durationMs: number;
  format: string;
  isMissing: boolean;
  addedAt: number;
}
