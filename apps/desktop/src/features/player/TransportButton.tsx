import type { LucideIcon } from "lucide-react";
import { skip } from "./player.control.styles";

interface TransportButtonProps {
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

export function TransportButton({ icon: Icon, label, disabled, onClick }: TransportButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={skip}
    >
      <Icon size={19} fill="currentColor" strokeWidth={1.6} />
    </button>
  );
}
