import { useState } from "react";
import { save } from "@tauri-apps/plugin-dialog";
import { useCurrentTrack } from "@/features/player/player.store";
import { isTauri } from "@/lib/assets";
import { exportAudioWav } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import { renderTrackWav } from "./studio.export";
import { useStudio } from "./studio.store";

const FILTERS = [{ name: "Audio WAV", extensions: ["wav"] }];

function fileName(title: string): string {
  return `${title.replace(/[\\/:*?"<>|]/g, "_").trim() || "export"}.wav`;
}

export function useExportWav() {
  const track = useCurrentTrack();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const run = async () => {
    if (!track) { setError("Aucun morceau en cours de lecture."); return; }
    if (!isTauri()) { setError("L'export est disponible dans l'application de bureau."); return; }
    setError(null);
    setNotice(null);
    const destination = await save({ defaultPath: fileName(track.title), filters: FILTERS });
    if (typeof destination !== "string") return;
    setBusy(true);
    try {
      const data = await renderTrackWav(track.path, useStudio.getState());
      await exportAudioWav(track.id, destination, data);
      setNotice(`Export créé : ${destination}`);
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };
  return { track, busy, error, notice, run };
}
