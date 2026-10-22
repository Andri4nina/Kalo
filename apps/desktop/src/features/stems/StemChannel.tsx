import { FileDown, Volume2, VolumeX } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { STEM_LABELS, type ChannelLevel, type MixStem } from "./mixer.levels";

interface Props {
  stem: MixStem;
  level: ChannelLevel;
  onChange: (patch: Partial<ChannelLevel>) => void;
  onExport: () => void;
}

const slider = "w-full accent-kalo-accent dark:accent-kalo-dark-accent";

/** Tranche de mixage : sourdine, volume, panoramique, export de la piste seule. */
export function StemChannel({ stem, level, onChange, onExport }: Props) {
  const label = STEM_LABELS[stem];
  return (
    <div className={cn("rounded-md bg-kalo-raised/60 p-3 dark:bg-kalo-dark-raised/60", level.muted && "opacity-60")}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold">{label}</span>
        <div className="flex items-center">
          <IconButton icon={level.muted ? VolumeX : Volume2} label={level.muted ? `Rétablir ${label}` : `Couper ${label}`} size="sm" active={level.muted} onClick={() => onChange({ muted: !level.muted })} />
          <IconButton icon={FileDown} label={`Exporter la piste ${label}`} size="sm" onClick={onExport} />
        </div>
      </div>
      <label className={cn("mt-2 block text-[11px]", muted)}>
        Volume {Math.round(level.volume * 100)} %
        <input type="range" min={0} max={1.5} step={0.05} value={level.volume} onChange={(event) => onChange({ volume: Number(event.target.value) })} className={slider} />
      </label>
      <label className={cn("mt-1 block text-[11px]", muted)}>
        Panoramique {level.pan === 0 ? "centre" : level.pan < 0 ? "gauche" : "droite"}
        <input type="range" min={-1} max={1} step={0.1} value={level.pan} onChange={(event) => onChange({ pan: Number(event.target.value) })} className={slider} />
      </label>
    </div>
  );
}
