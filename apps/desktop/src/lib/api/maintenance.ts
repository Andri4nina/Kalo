import { invoke } from "@tauri-apps/api/core";
import type { DuplicateGroup, FileImportReport, FingerprintSummary } from "@/types";

export const fingerprintLibrary = () => invoke<FingerprintSummary>("library_fingerprint");

export const listContentDuplicates = () => invoke<DuplicateGroup[]>("library_content_duplicates");

export const importFiles = (rootId: number, sources: string[]) =>
  invoke<FileImportReport>("library_import_files", { rootId, sources });
