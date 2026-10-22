import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface Props {
  hz: number;
  label: string;
  gain: number;
  disabled: boolean;
  onChange: (gain: number) => void;
}

export function EqBand({ hz, label, gain, disabled, onChange }: Props) {
  const id = `eq-${hz}`;
  return (
    <div className={cn("rounded-md border border-kalo-line px-3 py-2 dark:border-kalo-dark-line", disabled && "opacity-60")}>
      <div className="flex items-center justify-between gap-2 text-xs">
        <label htmlFor={id} className="font-medium">{label} Hz</label>
        <span className={cn("tabular-nums", muted)}>
          {gain > 0 ? "+" : ""}
          {gain.toFixed(1)} dB
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={-12}
        max={12}
        step={0.5}
        value={gain}
        disabled={disabled}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={`${gain.toFixed(1)} décibels`}
        className={`${focus} mt-2 w-full accent-kalo-accent dark:accent-kalo-dark-accent`}
      />
    </div>
  );
}
