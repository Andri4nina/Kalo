import { usePlayer } from "./player.store";
import { MixerSlider } from "./MixerSlider";

export function PlayerMixerPopover() {
  const volume = usePlayer((state) => state.volume);
  const balance = usePlayer((state) => state.balance);
  const { setVolume, setBalance } = usePlayer.getState();

  return (
    <div className="absolute bottom-full right-0 z-50 mb-3 w-64 rounded-2xl border border-kalo-line bg-kalo-panel p-4 shadow-soft dark:border-kalo-dark-line dark:bg-kalo-dark-panel">
      <MixerSlider id="player-volume" label="Volume" value={volume} min={0} max={1} step={0.01} onChange={setVolume} />
      <MixerSlider
        id="player-balance"
        label="Balance"
        value={balance}
        min={-1}
        max={1}
        step={0.05}
        onChange={setBalance}
        lowLabel="Gauche"
        midLabel="Centre"
        highLabel="Droite"
      />
    </div>
  );
}
