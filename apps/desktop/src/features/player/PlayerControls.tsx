import { Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { modeButton, modeOff, modeOn } from "./player.control.styles";
import { usePlayer } from "./player.store";
import { PlayPauseButton } from "./PlayPauseButton";
import { TransportButton } from "./TransportButton";

export function PlayerControls() {
  const shuffle = usePlayer((state) => state.shuffle);
  const repeat = usePlayer((state) => state.repeat);
  const hasQueue = usePlayer((state) => state.queue.length > 0);
  const { next, previous, toggleShuffle, cycleRepeat } = usePlayer.getState();

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button type="button" aria-label="Lecture aléatoire" aria-pressed={shuffle} onClick={toggleShuffle} className={`${modeButton} ${shuffle ? modeOn : modeOff}`}>
        <Shuffle size={16} strokeWidth={1.9} />
      </button>
      <TransportButton icon={SkipBack} label="Morceau précédent" disabled={!hasQueue} onClick={previous} />
      <PlayPauseButton />
      <TransportButton icon={SkipForward} label="Morceau suivant" disabled={!hasQueue} onClick={next} />
      <button
        type="button"
        aria-label={repeat === "one" ? "Répéter le morceau" : "Répéter la file"}
        aria-pressed={repeat !== "off"}
        onClick={cycleRepeat}
        className={`${modeButton} ${repeat !== "off" ? modeOn : modeOff}`}
      >
        {repeat === "one" ? <Repeat1 size={16} /> : <Repeat size={16} />}
      </button>
    </div>
  );
}
