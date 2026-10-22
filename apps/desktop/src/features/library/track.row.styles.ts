import { cn } from "@/lib/cn";

/** Ligne de morceau : coins arrondis, survol discret, sélection marquée. */
export function trackRowClass(selected: boolean, missing: boolean): string {
  return cn(
    "group transition-colors [&>td:first-child]:rounded-l-md [&>td:last-child]:rounded-r-md",
    missing && "opacity-60",
    selected
      ? "bg-kalo-raised dark:bg-kalo-dark-raised"
      : "hover:bg-kalo-raised/60 dark:hover:bg-kalo-dark-raised/60",
  );
}

export const trackTable = "w-full border-separate border-spacing-0 text-left";

export const trackHead = "px-3 pb-2 pt-1 text-xs font-medium text-kalo-muted dark:text-kalo-dark-muted";
