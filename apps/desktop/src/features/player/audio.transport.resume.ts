import { audioElement } from "./audio.element";

/// Applies a saved position once the media metadata is available.
export function resumeAt(positionMs: number): void {
  if (positionMs <= 0) return;
  const apply = () => {
    const duration = audioElement.duration;
    if (Number.isFinite(duration) && duration > positionMs / 1000) {
      audioElement.currentTime = positionMs / 1000;
    }
  };
  if (audioElement.readyState >= 1) apply();
  else audioElement.addEventListener("loadedmetadata", apply, { once: true });
}
