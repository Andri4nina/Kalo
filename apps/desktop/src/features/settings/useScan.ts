import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import { scanRoot } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import type { ScanProgress, ScanSummary } from "@/types";

export function useScan(onFinished: () => void) {
  const [scanningId, setScanningId] = useState<number | null>(null);
  const [progress, setProgress] = useState<ScanProgress | null>(null);
  const [summary, setSummary] = useState<ScanSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let unlisten: (() => void) | undefined;
    listen<ScanProgress>("library:scan-progress", (event) => setProgress(event.payload))
      .then((stop) => {
        if (active) unlisten = stop;
        else stop();
      })
      .catch(() => undefined);
    return () => {
      active = false;
      unlisten?.();
    };
  }, []);

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
