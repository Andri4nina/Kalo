export type DownloadStatus = "queued" | "running" | "paused" | "done" | "failed" | "cancelled";

export interface DownloadEntry {
  id: number;
  url: string;
  fileName: string;
  provider: "direct" | "archive";
  license: string | null;
  rootId: number;
  status: DownloadStatus;
  received: number;
  total: number | null;
  error: string | null;
  createdAt: number;
}

export interface DownloadProgress {
  id: number;
  received: number;
  total: number | null;
  bytesPerSecond: number;
}

export interface RemoteItem {
  provider: string;
  id: string;
  title: string;
  creator: string | null;
  license: string;
}

export interface RemoteFile {
  name: string;
  url: string;
  size: number | null;
  md5: string | null;
  format: string;
}

export interface DownloadRequest {
  url: string;
  rootId: number;
  provider: "direct" | "archive";
  fileName?: string | null;
  license?: string | null;
  md5?: string | null;
}
