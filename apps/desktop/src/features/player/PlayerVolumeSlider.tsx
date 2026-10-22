import { range } from "./player.control.styles";
import { usePlayer } from "./player.store";

/** Volume en ligne dans la barre ; le relever réactive le son coupé. */
export function PlayerVolumeSlider() {
  const volume = usePlayer((state) => state.volume);
  const muted = usePlayer((state) => state.muted);

  const change = (value: number) => {
    const player = usePlayer.getState();
    player.setVolume(value);
    if (player.muted && value > 0) player.toggleMute();
  };

  return (
    <input
      type="range"
      min={0}
      max={1}
      step={0.01}
      value={muted ? 0 : volume}
      onChange={(event) => change(Number(event.target.value))}
      aria-label="Volume"
      aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)} %`}
      className={`${range} hidden w-24 lg:block`}
    />
  );
}
