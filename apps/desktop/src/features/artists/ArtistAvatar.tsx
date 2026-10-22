import { cn } from "@/lib/cn";

const sizes = {
  square: "aspect-square w-full text-5xl shadow-cover",
  hero: "h-36 w-36 text-6xl shadow-cover md:h-48 md:w-48",
};

/** Avatar rond d'un artiste : initiale sur aplat d'accent (aucune photo locale). */
export function ArtistAvatar({ name, size }: { name: string; size: keyof typeof sizes }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-kalo-accent-soft font-display font-black text-kalo-accent-strong dark:bg-kalo-dark-raised dark:text-kalo-dark-accent",
        sizes[size],
      )}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
