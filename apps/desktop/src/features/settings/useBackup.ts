import { useState } from "react";
import { save } from "@tauri-apps/plugin-dialog";
import { backupDatabase } from "@/lib/api/data";
import { errorMessage } from "@/lib/format";

const FILTERS = [{ name: "Base Kalo", extensions: ["db"] }];

export function useBackup() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const run = async () => {
    setError(null);
    setNotice(null);
    const destination = await save({ defaultPath: "kalo-backup.db", filters: FILTERS });
    if (typeof destination !== "string") return;
    setBusy(true);
    try {
      await backupDatabase(destination);
      setNotice("Sauvegarde créée.");
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return { busy, error, notice, run };
}
