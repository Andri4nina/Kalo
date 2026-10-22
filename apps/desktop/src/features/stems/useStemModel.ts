import { useState } from "react";
import { cancelStem, installStemModel, stemModelStatus, uninstallStemModel } from "@/lib/api/stems";
import { errorMessage } from "@/lib/format";
import { useAsync } from "@/lib/useAsync";
import { useTauriEvent } from "@/lib/useTauriEvent";
import type { StemProgress } from "@/types";

/** État du modèle local, téléchargement sur demande, désinstallation. */
export function useStemModel() {
  const status = useAsync(stemModelStatus, []);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<StemProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  useTauriEvent<StemProgress>("stem:model-progress", setProgress);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
      setProgress(null);
      status.reload();
    }
  };

  return {
    status: status.data,
    loading: status.loading,
    busy,
    progress,
    error: error ?? status.error,
    install: () => run(installStemModel),
    uninstall: () => run(uninstallStemModel),
    cancel: () => void cancelStem(),
  };
}

export type StemModel = ReturnType<typeof useStemModel>;
