import { useState } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { cancelDownload, listDownloads, pauseDownload, removeDownload, resumeDownload, startDownload } from "@/lib/api/downloads";
import { errorMessage } from "@/lib/format";
import { useAsync } from "@/lib/useAsync";
import { useTauriEvent } from "@/lib/useTauriEvent";
import type { DownloadProgress, DownloadRequest } from "@/types";

/** Liste des téléchargements, progression en direct et commandes. */
export function useDownloads() {
  const list = useAsync(listDownloads, []);
  const bump = useLibraryVersion((state) => state.bump);
  const [progress, setProgress] = useState<Record<number, DownloadProgress>>({});
  const [error, setError] = useState<string | null>(null);
  useTauriEvent<DownloadProgress>("download:progress", (event) => setProgress((current) => ({ ...current, [event.id]: event })));
  useTauriEvent<number>("download:finished", () => {
    list.reload();
    bump();
  });

  const guard = async (action: () => Promise<unknown>) => {
    setError(null);
    try {
      await action();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    }
    list.reload();
  };

  return {
    entries: list.data ?? [],
    loading: list.loading && !list.data,
    progress,
    error: error ?? list.error,
    start: (request: DownloadRequest) => guard(() => startDownload(request)),
    pause: (id: number) => guard(() => pauseDownload(id)),
    resume: (id: number) => guard(() => resumeDownload(id)),
    cancel: (id: number) => guard(() => cancelDownload(id)),
    remove: (id: number) => guard(() => removeDownload(id)),
  };
}

export type Downloads = ReturnType<typeof useDownloads>;
