import { useEffect } from "react";
import { audioTransport } from "@/features/player/audio.transport";
import { usePlayer } from "@/features/player/player.store";
import { SHORTCUTS } from "@/features/settings/shortcuts";
import { useShortcuts } from "@/features/settings/shortcut.store";

function editable(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest("input, textarea, select, button, a, [contenteditable='true'], [role='dialog']"))
  );
}

export function useKeyboardShortcuts(): void {
  const bindings = useShortcuts((state) => state.bindings);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (editable(event.target)) return;
      const shortcut = SHORTCUTS.find((item) => bindings[item.id] === event.code);
      if (!shortcut) return;
      if (event.repeat && shortcut.id !== "seekBack" && shortcut.id !== "seekForward") return;
      const state = usePlayer.getState();
      if (shortcut.id === "toggle") {
        event.preventDefault();
        state.toggle();
      } else if (shortcut.id === "seekBack" || shortcut.id === "seekForward") {
        event.preventDefault();
        const delta = shortcut.id === "seekForward" ? 5000 : -5000;
        const next = Math.max(0, Math.min(state.positionMs + delta, state.durationMs));
        audioTransport.seek(next);
        state.setPosition(next);
      } else if (shortcut.id === "mute") state.toggleMute();
      else if (shortcut.id === "previous") state.previous();
      else if (shortcut.id === "next") state.next();
      else if (shortcut.id === "queue") state.setQueueOpen(!state.queueOpen);
      else if (shortcut.id === "shuffle") state.toggleShuffle();
      else if (shortcut.id === "repeat") state.cycleRepeat();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [bindings]);
}
