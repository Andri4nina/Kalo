import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { focus } from "@/design/tokens";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  size?: "sm" | "md";
}

export function IconButton({
  icon: Icon,
  label,
  active = false,
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full transition-colors disabled:opacity-40",
        size === "sm" ? "h-7 w-7" : "h-9 w-9",
        active
          ? "text-kalo-accent hover:text-kalo-accent-strong dark:text-kalo-dark-accent dark:hover:text-kalo-dark-accent-strong"
          : "text-kalo-muted hover:bg-kalo-raised hover:text-kalo-ink dark:text-kalo-dark-muted dark:hover:bg-kalo-dark-raised dark:hover:text-kalo-dark-ink",
        focus,
        className,
      )}
      {...props}
    >
      <Icon size={size === "sm" ? 15 : 18} strokeWidth={1.9} />
    </button>
  );
}
