import { assetUrl, isTauri } from "@/lib/assets";
import { audioElement } from "./audio.element";
import { playError } from "./audio.events";
import { resumeAt } from "./audio.transport.resume";
import { usePlayer } from "./player.store";

class AudioTransport {
  /** Morceau chargé, identifié par id et chemin : un fichier relocalisé est rechargé. */
  private loadedKey: string | null = null;
  load(path: string, id: number): void {
    const key = `${id}|${path}`;
    if (this.loadedKey === key) return;
    if (!isTauri()) {
      usePlayer.getState().setError("Le moteur audio nécessite l'application native Kalo.");
      return;
    }
    const url = assetUrl(path);
    if (!url) return;
    this.loadedKey = key;
    audioElement.src = url;
    audioElement.load();
  }
  async play(): Promise<void> {
    if (!audioElement.src) return;
    try {
      await audioElement.play();
    } catch (reason: unknown) {
      if ((reason as DOMException | undefined)?.name !== "AbortError") {
        usePlayer.getState().setPlaying(false);
        usePlayer.getState().setError(playError(reason));
      }
    }
  }
  pause(): void {
    audioElement.pause();
  }
  seek(positionMs: number): void {
    const duration = audioElement.duration;
    if (!Number.isFinite(duration)) return;
    audioElement.currentTime = Math.min(Math.max(positionMs / 1000, 0), duration);
  }
  resume(positionMs: number): void {
    resumeAt(positionMs);
  }
  setLoop(loop: boolean): void {
    audioElement.loop = loop;
  }
}

export const audioTransport = new AudioTransport();
