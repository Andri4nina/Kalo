import { LoaderCircle, Pause, Play } from "lucide-react";
import { focus } from "@/design/tokens";
import { usePlayer } from "./player.store";

export function PlayPauseButton() {
  const playing = usePlayer((state) => state.playing);
  const buffering = usePlayer((state) => state.buffering);
  const hasQueue = usePlayer((state) => state.queue.length > 0);
  const toggle = usePlayer((state) => state.toggle);
  return (
    <button
      type="button"
      aria-label={playing ? "Mettre en pause" : "Lire"}
      disabled={!hasQueue}
      onClick={toggle}
      className={`${focus} mx-2 flex h-10 w-10 items-center justify-center rounded-full bg-kalo-ink text-kalo-panel transition-transform hover:scale-105 disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:scale-100 dark:bg-kalo-dark-ink dark:text-kalo-dark-canvas`}
    >
      {buffering && playing ? (
        <LoaderCircle size={18} className="animate-spin" />
      ) : playing ? (
        <Pause size={18} fill="currentColor" />
      ) : (
        <Play size={18} fill="currentColor" className="ml-0.5" />
      )}
    </button>
  );
}
