import { input, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { MAX_FREQ, MAX_Q, MIN_FREQ, MIN_Q, type BandShape } from "./eq.shape";

interface Props {
  index: number;
  band: BandShape;
  onChange: (patch: Partial<BandShape>) => void;
}

/** Une bande paramétrique : fréquence centrale en hertz et largeur (Q). */
export function ParametricBand({ index, band, onChange }: Props) {
  const freqId = `pq-freq-${index}`;
  const qId = `pq-q-${index}`;
  return (
    <div className="grid grid-cols-[auto_6rem_1fr_2.5rem] items-center gap-2 text-xs">
      <span className={cn("w-6 tabular-nums", muted)}>{index + 1}</span>
      <label htmlFor={freqId} className="sr-only">Fréquence de la bande {index + 1}</label>
      <input
        id={freqId}
        type="number"
        min={MIN_FREQ}
        max={MAX_FREQ}
        value={band.freq}
        onChange={(event) => onChange({ freq: Number(event.target.value) })}
        className={cn(input, "h-8 px-2 py-1 text-xs tabular-nums")}
      />
      <label htmlFor={qId} className="sr-only">Largeur de la bande {index + 1}</label>
      <input
        id={qId}
        type="range"
        min={MIN_Q}
        max={MAX_Q}
        step={0.1}
        value={band.q}
        onChange={(event) => onChange({ q: Number(event.target.value) })}
        aria-valuetext={`Q ${band.q.toFixed(1)}`}
        className="w-full accent-kalo-accent dark:accent-kalo-dark-accent"
      />
      <span className="text-right tabular-nums">{band.q.toFixed(1)}</span>
    </div>
  );
}
