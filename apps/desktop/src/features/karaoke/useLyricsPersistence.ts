import { save } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { exportLyrics, resetLyrics, saveLyrics } from "@/lib/api/lyrics";
import { errorMessage } from "@/lib/format";
import { safeName } from "@/lib/safeName";
import type { Track } from "@/types";
import type { EditLine } from "./lrc.edit";
import { toLrc } from "./lrc.format";

/** Enregistrement dans Kalo, export .lrc choisi par l'utilisateur, retour au fichier. */
export function useLyricsPersistence(track: Track, onDone: () => void) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const run = async (action: () => Promise<string | null>) => {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      setNotice(await action());
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  const store = (lines: EditLine[]) => run(async () => {
    await saveLyrics(track.id, toLrc(lines));
    onDone();
    return null;
  });
  const exportFile = (lines: EditLine[]) => run(async () => {
    const destination = await save({ defaultPath: `${safeName(track.title)}.lrc`, filters: [{ name: "Paroles LRC", extensions: ["lrc"] }] });
    if (!destination) return null;
    await exportLyrics(toLrc(lines), destination);
    return `Paroles exportées vers ${destination}`;
  });
  const restore = () => run(async () => {
    await resetLyrics(track.id);
    onDone();
    return null;
  });

  return { busy, error, notice, store, exportFile, restore };
}
