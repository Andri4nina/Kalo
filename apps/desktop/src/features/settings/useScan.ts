import { useState } from "react";
import { scanRoot } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import { useTauriEvent } from "@/lib/useTauriEvent";
import type { ScanProgress, ScanSummary } from "@/types";

export function useScan(onFinished: () => void) {
  const [scanningId, setScanningId] = useState<number | null>(null);
  const [progress, setProgress] = useState<ScanProgress | null>(null);
  const [summary, setSummary] = useState<ScanSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  useTauriEvent<ScanProgress>("library:scan-progress", setProgress);

  const start = async (rootId: number) => {
    setScanningId(rootId);
    setProgress(null);
    setSummary(null);
    setError(null);
    try {
      const result = await scanRoot(rootId);
      setSummary(result);
      onFinished();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setScanningId(null);
      setProgress(null);
    }
  };

  const startAll = async (rootIds: number[]) => {
    for (const rootId of rootIds) await start(rootId);
  };

  return { scanningId, progress, summary, error, start, startAll };
}
