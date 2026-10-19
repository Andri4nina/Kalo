import { usePlayer } from "./player.store";
import { persistPlayerSession } from "./player.session.storage";

/// Persists the queue when its content or the current index changes.
export function watchPlayerSession(): () => void {
  let signature = "";
  return usePlayer.subscribe((state) => {
    const last = state.queue[state.queue.length - 1]?.id ?? 0;
    const next = `${state.index}|${state.queue.length}|${state.queue[0]?.id ?? 0}|${last}`;
    if (next === signature) return;
    signature = next;
    persistPlayerSession(state.queue, state.index);
  });
}
