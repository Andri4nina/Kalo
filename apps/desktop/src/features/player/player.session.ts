import { usePlayer } from "./player.store";
import { persistPlayerSession } from "./player.session.storage";

let lastSavedPosition = 0;

/// Persists the queue when its content or the current index changes.
export function watchPlayerSession(): () => void {
  let signature = "";
  return usePlayer.subscribe((state) => {
    const last = state.queue[state.queue.length - 1]?.id ?? 0;
    const next = `${state.index}|${state.queue.length}|${state.queue[0]?.id ?? 0}|${last}`;
    if (next === signature) return;
    signature = next;
    lastSavedPosition = state.positionMs;
    persistPlayerSession(state.queue, state.index, state.positionMs);
  });
}

/// Persists the playback position at most every five seconds.
export function persistPlayerPosition(positionMs: number): void {
  if (Math.abs(positionMs - lastSavedPosition) < 5_000) return;
  lastSavedPosition = positionMs;
  const { queue, index } = usePlayer.getState();
  persistPlayerSession(queue, index, positionMs);
}