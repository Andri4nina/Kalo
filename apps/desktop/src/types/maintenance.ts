export interface FingerprintProgress {
  done: number;
  total: number;
}

export interface FingerprintSummary {
  hashed: number;
  errors: number;
  durationMs: number;
}

export interface LibraryChanges {
  indexed: number;
  missing: number;
  rescanned: boolean;
}

export interface FileImportFailure {
  path: string;
  reason: string;
}

export interface FileImportReport {
  copied: number;
  alreadyPresent: number;
  failed: FileImportFailure[];
}
