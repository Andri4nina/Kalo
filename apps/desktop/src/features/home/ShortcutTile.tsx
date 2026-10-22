import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface ShortcutTileProps {
  to: string;
  icon: LucideIcon;
  label: string;
  detail: string;
}

/** Tuile horizontale d'accès rapide, dans l'esprit des raccourcis Spotify. */
export function ShortcutTile({ to, icon: Icon, label, detail }: ShortcutTileProps) {
  return (
    <Link
      to={to}
      className={cn(
        focus,
        "flex items-center gap-3 overflow-hidden rounded-md bg-kalo-raised/70 pr-3 transition-colors hover:bg-kalo-raised dark:bg-kalo-dark-raised/60 dark:hover:bg-kalo-dark-raised",
      )}
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-kalo-accent-soft text-kalo-accent-strong dark:bg-kalo-dark-accent-soft dark:text-kalo-dark-accent">
        <Icon size={22} strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold">{label}</span>
        <span className={cn("block truncate text-xs", muted)}>{detail}</span>
      </span>
    </Link>
  );
}
