import { cn } from "@/lib/cn";

/** Fait apparaître un élément au survol ou au focus de la carte (toujours visible au tactile). */
export const reveal =
  "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100 motion-reduce:translate-y-0";

/** Étend la zone cliquable d'un lien ou bouton à toute la carte parente. */
export const stretched =
  "outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-kalo-accent dark:focus-visible:after:ring-kalo-dark-accent";

/** Pastille de lecture ronde à l'accent Kalo. */
export function playCircle(size: "md" | "lg"): string {
  return cn(
    "flex shrink-0 items-center justify-center rounded-full bg-kalo-accent text-kalo-accent-ink shadow-pop transition hover:scale-105 hover:brightness-110 motion-reduce:transition-none motion-reduce:hover:scale-100 dark:bg-kalo-dark-accent",
    size === "lg" ? "h-14 w-14" : "h-12 w-12",
  );
}
