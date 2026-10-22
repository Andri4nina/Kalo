import { Pause, Play } from "lucide-react";
import { chipOff, chipOn, focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import type { MixPreset } from "./mixer.levels";
import type { StemMixer } from "./useStemMixer";

const PRESETS: Array<[MixPreset, string]> = [["all", "Toutes les pistes"], ["karaoke", "Karaoké (sans voix)"], ["acapella", "A cappella"]];
const chip = "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors";

/** Lecture, position, préréglages et comparaison avec l'original. */
export function MixerTransport({ mixer }: { mixer: StemMixer }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <button type="button" aria-label={mixer.playing ? "Mettre le mix en pause" : "Lire le mix"} onClick={mixer.toggle} className={cn(focus, "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-kalo-ink text-kalo-panel dark:bg-kalo-dark-ink dark:text-kalo-dark-canvas")}>
          {mixer.playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
        </button>
        <span className={cn("w-10 text-right text-[11px] tabular-nums", muted)}>{formatDuration(mixer.position * 1000)}</span>
        <input type="range" min={0} max={Math.max(mixer.duration, 0.1)} step={0.1} value={mixer.position} onChange={(event) => mixer.seek(Number(event.target.value))} aria-label="Position dans le mix" className="w-full accent-kalo-ink dark:accent-kalo-dark-ink" />
        <span className={cn("w-10 text-[11px] tabular-nums", muted)}>{formatDuration(mixer.duration * 1000)}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(([name, label]) => (
          <button key={name} type="button" onClick={() => mixer.applyPreset(name)} className={cn(focus, chip, chipOff)}>{label}</button>
        ))}
        <button type="button" aria-pressed={mixer.original} onClick={() => mixer.setOriginal(!mixer.original)} className={cn(focus, chip, mixer.original ? chipOn : chipOff)}>
          Écouter l'original
        </button>
      </div>
    </div>
  );
}
