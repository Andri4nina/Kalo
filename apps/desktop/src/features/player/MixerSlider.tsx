interface MixerSliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  lowLabel?: string;
  midLabel?: string;
  highLabel?: string;
}

export function MixerSlider(props: MixerSliderProps) {
  return (
    <div className="mt-3 first:mt-0">
      <label className="block text-xs font-medium" htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(event) => props.onChange(Number(event.target.value))}
        className="mt-2 w-full accent-kalo-accent dark:accent-kalo-dark-accent"
      />
      {props.lowLabel ? (
        <div className="flex justify-between text-[10px] text-kalo-muted dark:text-kalo-dark-muted">
          <span>{props.lowLabel}</span>
          <span>{props.midLabel}</span>
          <span>{props.highLabel}</span>
        </div>
      ) : null}
    </div>
  );
}
