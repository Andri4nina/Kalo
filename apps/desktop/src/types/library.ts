export interface LibraryRoot {
  id: number;
  path: string;
  addedAt: number;
  lastScanAt: number | null;
}

export interface LibraryStats {
  tracks: number;
  albums: number;
  artists: number;
  favorites: number;
  playlists: number;
  totalDurationMs: number;
  missing: number;
}

export interface ScanProgress {
  scanned: number;
  imported: number;
  errors: number;
  current: string;
}

export interface ScanSummary {
  filesFound: number;
  imported: number;
  updated: number;
  errors: number;
  missing: number;
  durationMs: number;
}

export interface ImportSummary {
  added: number;
  skipped: number;
}
