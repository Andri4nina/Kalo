import { invoke } from "@tauri-apps/api/core";
import type { DownloadEntry, DownloadRequest, RemoteFile, RemoteItem } from "@/types";

export const startDownload = (request: DownloadRequest) => invoke<number>("download_start", { request });

export const listDownloads = () => invoke<DownloadEntry[]>("download_list");

export const pauseDownload = (id: number) => invoke<boolean>("download_pause", { id });

export const resumeDownload = (id: number) => invoke<void>("download_resume", { id });

export const cancelDownload = (id: number) => invoke<void>("download_cancel", { id });

export const removeDownload = (id: number) => invoke<void>("download_remove", { id });

export const searchArchive = (query: string) => invoke<RemoteItem[]>("download_search", { query });

export const archiveFiles = (item: string) => invoke<RemoteFile[]>("download_files", { item });
