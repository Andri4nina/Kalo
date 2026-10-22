import { audioElement } from "./audio.element";
import { resumeAt } from "./audio.transport.resume";
import { usePlayer } from "./player.store";

/**
 * Recharge le morceau courant (disque rebranché, fichier restauré) et reprend
 * à la position atteinte avant l'erreur.
 */
export function retryCurrent(): void {
  const state = usePlayer.getState();
  if (!audioElement.src || state.index < 0) return;
  const position = state.positionMs;
  state.setError(null);
  audioElement.load();
  resumeAt(position);
  state.setPlaying(true);
}
