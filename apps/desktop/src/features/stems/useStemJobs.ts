import { useState } from "react";
import { cancelStem, deleteStemJob, listStemJobs, startStem } from "@/lib/api/stems";
import { errorMessage } from "@/lib/format";
import { useAsync } from "@/lib/useAsync";
import { useTauriEvent } from "@/lib/useTauriEvent";
import type { StemProgress } from "@/types";

/** Tâches de séparation : liste, progression en direct, lancement, annulation. */
export function useStemJobs() {
  const jobs = useAsync(listStemJobs, []);
  const [progress, setProgress] = useState<StemProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  useTauriEvent<StemProgress>("stem:progress", setProgress);
  useTauriEvent<number>("stem:finished", () => {
    setProgress(null);
    jobs.reload();
  });

  const guard = async (action: () => Promise<unknown>) => {
    setError(null);
    try {
      await action();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    }
    jobs.reload();
  };

  return {
    jobs: jobs.data ?? [],
    loading: jobs.loading && !jobs.data,
    progress,
    error: error ?? jobs.error,
    start: (trackId: number) => guard(() => startStem(trackId)),
    cancel: () => guard(cancelStem),
    remove: (jobId: number) => guard(() => deleteStemJob(jobId)),
  };
}

export type StemJobs = ReturnType<typeof useStemJobs>;
