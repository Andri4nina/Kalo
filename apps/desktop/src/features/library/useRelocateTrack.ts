import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { usePlayer } from "@/features/player/player.store";
import { relocateTrack } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import type { Track } from "@/types";
import { useLibraryVersion } from "./library.store";

const AUDIO = ["mp3", "flac", "m4a", "aac", "ogg", "oga", "opus", "wav"];

/**
 * Relocalise un fichier introuvable vers un chemin choisi par l'utilisateur ;
 * la file d'attente reçoit le nouveau chemin pour relancer la lecture.
 */
export function useRelocateTrack(track: Track | null | undefined) {
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);
  const pick = async (): Promise<boolean> => {
    if (!track) return false;
    const path = await open({ multiple: false, directory: false, filters: [{ name: "Audio", extensions: AUDIO }] });
    if (typeof path !== "string") return false;
    try {
      await relocateTrack(track.id, path);
      usePlayer.getState().patchTrack(track.id, { path, isMissing: false });
      bump();
      return true;
    } catch (reason: unknown) {
      setError(errorMessage(reason));
      return false;
    }
  };
  return { pick, error, clearError: () => setError(null) };
}
