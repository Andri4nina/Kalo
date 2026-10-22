import { ListMusic } from "lucide-react";
import { cn } from "@/lib/cn";

const sizes = {
  tile: "h-11 w-11 rounded",
  square: "aspect-square w-full rounded-md shadow-cover",
  hero: "h-36 w-36 rounded-md shadow-cover md:h-48 md:w-48",
};
const icons = { tile: 20, square: 44, hero: 64 };

/** Visuel d'une playlist : aplat d'accent et icône, faute de pochette dédiée. */
export function PlaylistArtwork({ size }: { size: keyof typeof sizes }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center bg-kalo-accent-soft text-kalo-accent-strong dark:bg-kalo-dark-raised dark:text-kalo-dark-accent",
        sizes[size],
      )}
    >
      <ListMusic size={icons[size]} strokeWidth={1.7} aria-hidden="true" />
    </span>
  );
}
