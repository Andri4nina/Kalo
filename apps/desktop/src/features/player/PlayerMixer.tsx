import { SlidersVertical, Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { modeButton, modeOff, modeOn } from "./player.control.styles";
import { usePlayer } from "./player.store";
import { PlayerMixerPopover } from "./PlayerMixerPopover";
import { PlayerVolumeSlider } from "./PlayerVolumeSlider";

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
        aria-label="Volume et balance"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={cn(modeButton, open ? modeOn : modeOff)}
      >
        <SlidersVertical size={18} strokeWidth={1.9} />
      </button>
      <button
        type="button"
        aria-label={muted ? "Réactiver le son" : "Couper le son"}
        onClick={toggleMute}
        className={cn(modeButton, modeOff)}
      >
        <VolumeIcon size={18} strokeWidth={1.9} />
      </button>
      <PlayerVolumeSlider />
      {open ? (
        <>
          <button
            type="button"
            aria-label="Fermer le réglage du son"
            tabIndex={-1}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <PlayerMixerPopover />
        </>
      ) : null}
    </div>
  );
}
