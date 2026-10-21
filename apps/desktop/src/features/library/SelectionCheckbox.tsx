import { focus } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface Props {
  checked: boolean;
  label: string;
  onChange: () => void;
}

export function SelectionCheckbox({ checked, label, onChange }: Props) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      className={cn("h-4 w-4 cursor-pointer rounded accent-kalo-accent dark:accent-kalo-dark-accent", focus)}
    />
  );
}
