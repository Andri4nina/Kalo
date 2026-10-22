import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { importFiles } from "@/lib/api/maintenance";
import { errorMessage } from "@/lib/format";
import type { FileImportReport } from "@/types";
import { useLibraryVersion } from "./library.store";

const AUDIO = ["mp3", "flac", "m4a", "aac", "ogg", "oga", "opus", "wav"];

/** Choix des fichiers, copie vérifiée vers un dossier de la bibliothèque, bilan. */
export function useImportFiles() {
  const [sources, setSources] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [report, setReport] = useState<FileImportReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const choose = async () => {
    const picked = await open({ multiple: true, directory: false, filters: [{ name: "Audio", extensions: AUDIO }] });
    const list = Array.isArray(picked) ? picked : typeof picked === "string" ? [picked] : [];
    setReport(null);
    setError(null);
    setSources(list);
  };

  const copy = async (rootId: number) => {
    setBusy(true);
    setError(null);
    try {
      setReport(await importFiles(rootId, sources));
      bump();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  const close = () => {
    setSources([]);
    setReport(null);
    setError(null);
  };

  return { sources, busy, report, error, choose, copy, close };
}
