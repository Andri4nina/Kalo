import { LoaderCircle, Play } from "lucide-react";
import { focus } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { playCircle } from "./media.styles";

interface PlayCircleButtonProps {
  label: string;
  onClick: () => void;
  busy?: boolean;
  disabled?: boolean;
  size?: "md" | "lg";
  className?: string;
}

/** Bouton de lecture rond à l'accent Kalo, pour lancer une collection entière. */
export function PlayCircleButton({ label, onClick, busy = false, disabled = false, size = "md", className }: PlayCircleButtonProps) {
  const icon = size === "lg" ? 24 : 20;
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-busy={busy}
      disabled={disabled || busy}
      onClick={onClick}
      className={cn(focus, playCircle(size), "disabled:cursor-not-allowed disabled:opacity-60", className)}
    >
      {busy ? (
        <LoaderCircle size={icon} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
      ) : (
        <Play size={icon} fill="currentColor" className="ml-0.5" aria-hidden="true" />
      )}
    </button>
  );
}
