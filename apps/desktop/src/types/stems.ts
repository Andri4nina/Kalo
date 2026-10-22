export type StemStatus = "running" | "done" | "failed" | "cancelled";

export interface StemJob {
  id: number;
  trackId: number;
  trackPath: string;
  title: string;
  artist: string | null;
  status: StemStatus;
  error: string | null;
  outputDir: string | null;
  createdAt: number;
  finishedAt: number | null;
}

export interface StemProgress {
  jobId: number | null;
  done: number;
  total: number;
}

export interface StemModelStatus {
  installed: boolean;
  installedBytes: number;
  downloadBytes: number;
  source: string;
  license: string;
}
