import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { useLibraryVersion } from "@/features/library/library.store";
import { usePlayer } from "@/features/player/player.store";
import { restoreDatabase } from "@/lib/api/data";
import { errorMessage } from "@/lib/format";

const FILTERS = [{ name: "Base Kalo", extensions: ["db"] }];

export function useRestore() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);
  const clearQueue = usePlayer((state) => state.clearQueue);

  const choose = async () => {
    setError(null);
    setNotice(null);
    const source = await open({ multiple: false, filters: FILTERS });
    if (typeof source === "string") setPending(source);
  };

  const confirm = async () => {
    if (!pending) return;
    setBusy(true);
    setError(null);
    try {
      await restoreDatabase(pending);
      clearQueue();
      bump();
      setPending(null);
      setNotice("Sauvegarde restaurée. La bibliothèque est à jour.");
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return { busy, error, notice, pending, choose, confirm, cancel: () => setPending(null) };
}
