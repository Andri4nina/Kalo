import { SlidersHorizontal, Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { usePlayer } from "./player.store";
import { PlayerMixerPopover } from "./PlayerMixerPopover";

export function PlayerMixer() {
  const [open, setOpen] = useState(false);
  const volume = usePlayer((state) => state.volume);
  const muted = usePlayer((state) => state.muted);
  const toggleMute = usePlayer((state) => state.toggleMute);
  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div className="relative flex items-center gap-1">
      <button
        type="button"
        aria-label={muted ? "Réactiver le son" : "Couper le son"}
        onClick={toggleMute}
        className="rounded-full p-2 text-kalo-muted hover:text-kalo-ink dark:text-kalo-dark-muted dark:hover:text-kalo-dark-ink"
      >
        <VolumeIcon size={18} strokeWidth={1.9} />
      </button>
      <button
        type="button"
        aria-label="Volume et balance"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`rounded-full p-2 transition-colors ${open ? "bg-kalo-raised text-kalo-ink dark:bg-kalo-dark-raised dark:text-kalo-dark-ink" : "text-kalo-muted hover:text-kalo-ink dark:text-kalo-dark-muted dark:hover:text-kalo-dark-ink"}`}
      >
        <SlidersHorizontal size={18} strokeWidth={1.9} />
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-label="Fermer le réglage du son"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <PlayerMixerPopover />
        </>
      ) : null}
    </div>
  );
}
