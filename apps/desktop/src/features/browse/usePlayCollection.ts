import { useState } from "react";
import { usePlayer } from "@/features/player/player.store";
import { errorMessage } from "@/lib/format";
import type { Track } from "@/types";
import { startCollection } from "./collection.play";

/** Charge une collection à la demande puis la lit ; l'erreur s'affiche dans le lecteur. */
export function usePlayCollection() {
  const [busy, setBusy] = useState(false);
  const play = async (load: () => Promise<Track[]>, source: string) => {
    setBusy(true);
    try {
      startCollection(await load(), source);
    } catch (reason: unknown) {
      usePlayer.getState().setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };
  return { busy, play };
}
