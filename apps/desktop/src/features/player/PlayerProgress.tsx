import { formatDuration } from "@/lib/format";
import { audioTransport } from "./audio.transport";
import { usePlayer } from "./player.store";

export function PlayerProgress() {
  const position = usePlayer((state) => state.positionMs);
  const duration = usePlayer((state) => state.durationMs);
  const max = Math.max(duration, 1);

  const seek = (value: number) => {
    audioTransport.seek(value);
    usePlayer.getState().setPosition(value);
  };

  return (
    <div className="flex items-center gap-2 text-[11px] tabular-nums text-kalo-muted dark:text-kalo-dark-muted">
      <span className="w-9 text-right">{formatDuration(position)}</span>
      <input
        type="range"
        min={0}
        max={max}
        value={Math.min(position, max)}
        onChange={(event) => seek(Number(event.target.value))}
        aria-label="Position de lecture"
        className="h-1 w-full cursor-pointer accent-kalo-accent dark:accent-kalo-dark-accent"
      />
      <span className="w-9">{formatDuration(duration)}</span>
    </div>
  );
}
