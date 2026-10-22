import { useState } from "react";
import { fingerprintLibrary, listContentDuplicates } from "@/lib/api/maintenance";
import { errorMessage } from "@/lib/format";
import { useTauriEvent } from "@/lib/useTauriEvent";
import type { DuplicateGroup, FingerprintProgress, FingerprintSummary } from "@/types";

/** Calcule les empreintes manquantes puis charge les groupes identiques. */
export function useFingerprint() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState<FingerprintProgress | null>(null);
  const [summary, setSummary] = useState<FingerprintSummary | null>(null);
  const [groups, setGroups] = useState<DuplicateGroup[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useTauriEvent<FingerprintProgress>("library:fingerprint-progress", setProgress);

  const run = async () => {
    setRunning(true);
    setError(null);
    setProgress(null);
    try {
      setSummary(await fingerprintLibrary());
      setGroups(await listContentDuplicates());
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setRunning(false);
    }
  };

  return { running, progress, summary, groups, error, run };
}
