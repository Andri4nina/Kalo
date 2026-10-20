import { Search } from "lucide-react";
import { input } from "@/design/tokens";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
  className?: string;
}

export function SearchField({ value, onChange, placeholder, label, className }: Props) {
  return (
    <div className={`relative min-w-56 flex-1 ${className ?? ""}`}>
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-kalo-muted dark:text-kalo-dark-muted"
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className={`${input} pl-9`}
      />
    </div>
  );
}
