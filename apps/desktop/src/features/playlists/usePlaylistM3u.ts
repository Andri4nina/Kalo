import { open, save } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { useLibraryVersion } from "@/features/library/library.store";
import { exportPlaylistM3u, importPlaylistM3u } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";
import type { Playlist } from "@/types";

export interface M3uFeedback {
  title: string;
  message: string;
  error: boolean;
}

export function usePlaylistM3u(playlist: Playlist) {
  const [feedback, setFeedback] = useState<M3uFeedback | null>(null);
  const [busy, setBusy] = useState(false);
  const bump = useLibraryVersion((state) => state.bump);

  const exportM3u = async () => {
    const destination = await save({ defaultPath: `${playlist.name}.m3u`, filters: [{ name: "Playlist M3U", extensions: ["m3u"] }] });
    if (typeof destination !== "string") return;
    setBusy(true);
    try {
      await exportPlaylistM3u(playlist.id, destination);
      setFeedback({ title: "Export terminé", message: "La playlist a été exportée au format M3U.", error: false });
    } catch (reason: unknown) {
      setFeedback({ title: "Export impossible", message: errorMessage(reason), error: true });
    } finally {
      setBusy(false);
    }
  };

  const importM3u = async () => {
    const source = await open({ multiple: false, directory: false, filters: [{ name: "Playlist M3U", extensions: ["m3u", "m3u8"] }] });
    if (typeof source !== "string") return;
    setBusy(true);
    try {
      const summary = await importPlaylistM3u(playlist.id, source);
      bump();
      setFeedback({ title: "Import terminé", message: `${summary.added} morceau(x) ajouté(s), ${summary.skipped} ignoré(s).`, error: false });
    } catch (reason: unknown) {
      setFeedback({ title: "Import impossible", message: errorMessage(reason), error: true });
    } finally {
      setBusy(false);
    }
  };

  return { feedback, setFeedback, busy, exportM3u, importM3u };
}