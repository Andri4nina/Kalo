import { errorMessage } from "@/lib/format";
import { usePlayer } from "./player.store";
import { persistPlayerPosition } from "./player.session";

export const READ_ERROR =
  "Lecture impossible. Vérifiez que le fichier existe et que son format est pris en charge.";

/** Message lisible pour un refus de lecture ; une source illisible devient READ_ERROR. */
export function playError(reason: unknown): string {
  return (reason as DOMException | undefined)?.name === "NotSupportedError" ? READ_ERROR : errorMessage(reason);
}

export function bindAudioEvents(audio: HTMLAudioElement): void {
  audio.addEventListener("timeupdate", () => {
    const positionMs = audio.currentTime * 1000;
    usePlayer.getState().setPosition(positionMs);
    persistPlayerPosition(positionMs);
  });
  audio.addEventListener("loadedmetadata", () => {
    usePlayer.getState().setDuration(Number.isFinite(audio.duration) ? audio.duration * 1000 : 0);
  });
  audio.addEventListener("ended", () => usePlayer.getState().advance());
  audio.addEventListener("waiting", () => usePlayer.getState().setBuffering(true));
  audio.addEventListener("playing", () => usePlayer.getState().setBuffering(false));
  audio.addEventListener("error", () => {
    const state = usePlayer.getState();
    state.setBuffering(false);
    state.setPlaying(false);
    state.setError(READ_ERROR);
  });
}
