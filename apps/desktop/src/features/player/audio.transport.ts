import { assetUrl, isTauri } from "@/lib/assets";
import { errorMessage } from "@/lib/format";
import { audioElement } from "./audio.element";
import { resumeAt } from "./audio.transport.resume";
import { usePlayer } from "./player.store";

class AudioTransport {
  private loadedId: number | null = null;
  load(path: string, id: number): void {
    if (this.loadedId === id) return;
    if (!isTauri()) {
      usePlayer.getState().setError("Le moteur audio nécessite l'application native Kalo.");
      return;
    }
    const url = assetUrl(path);
    if (!url) return;
    this.loadedId = id;
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
        usePlayer.getState().setError(errorMessage(reason));
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
