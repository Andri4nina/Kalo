import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface SwitchRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

/** Ligne de réglage avec interrupteur accessible (rôle switch). */
export function SwitchRow({ label, description, checked, onChange, disabled = false }: SwitchRowProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn("mt-4 flex w-full items-center justify-between gap-4 rounded-md border p-3 text-left text-xs disabled:opacity-60", focus, "border-kalo-line dark:border-kalo-dark-line")}
    >
      <span>
        <span className="block font-medium">{label}</span>
        <span className={cn("mt-0.5 block", muted)}>{description}</span>
      </span>
      <span aria-hidden className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", checked ? "bg-kalo-accent dark:bg-kalo-dark-accent" : "bg-kalo-line dark:bg-kalo-dark-line")}>
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-kalo-panel transition-transform dark:bg-kalo-dark-panel", checked ? "left-4" : "left-0.5")} />
      </span>
    </button>
  );
}
