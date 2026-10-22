import { useState } from "react";
import { archiveFiles, searchArchive } from "@/lib/api/downloads";
import { errorMessage } from "@/lib/format";
import type { RemoteFile, RemoteItem } from "@/types";

/** Recherche Internet Archive (licences libres) et fichiers audio d'une œuvre. */
export function useArchive() {
  const [items, setItems] = useState<RemoteItem[] | null>(null);
  const [files, setFiles] = useState<Record<string, RemoteFile[]>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  const search = (query: string) => run(async () => setItems(await searchArchive(query)));
  const open = (item: string) =>
    files[item] ? Promise.resolve() : run(async () => {
      const list = await archiveFiles(item);
      setFiles((current) => ({ ...current, [item]: list }));
    });
  return { items, files, busy, error, search, open };
}
