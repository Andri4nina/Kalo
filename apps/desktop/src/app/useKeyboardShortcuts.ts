import { useEffect } from "react";
import { audioTransport } from "@/features/player/audio.transport";
import { usePlayer } from "@/features/player/player.store";

function editable(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest("input, textarea, select, button, a, [contenteditable='true'], [role='dialog']"))
  );
}

export function useKeyboardShortcuts(): void {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (editable(event.target)) return;
      const state = usePlayer.getState();
      if (event.code === "Space") {
        if (event.repeat) return;
        event.preventDefault();
        state.toggle();
      } else if (event.code === "ArrowRight" || event.code === "ArrowLeft") {
        const delta = event.code === "ArrowRight" ? 5000 : -5000;
        const next = Math.max(0, Math.min(state.positionMs + delta, state.durationMs));
        audioTransport.seek(next);
        state.setPosition(next);
      } else if (event.key.toLowerCase() === "m") {
        state.toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
