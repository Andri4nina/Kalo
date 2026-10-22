import { ListMusic } from "lucide-react";
import { Cover } from "@/components/Cover";
import { cn } from "@/lib/cn";

const sizes = {
  tile: "h-10 w-10 rounded",
  square: "aspect-square w-full rounded-md shadow-cover",
  hero: "h-36 w-36 rounded-md shadow-cover md:h-48 md:w-48",
};
const coverSizes = { tile: "sm", square: "square", hero: "hero" } as const;
const icons = { tile: 20, square: 44, hero: 64 };

interface Props {
  size: keyof typeof sizes;
  src?: string | null;
}

/** Visuel d'une playlist : sa pochette si elle en a une, sinon un aplat d'accent. */
export function PlaylistArtwork({ size, src }: Props) {
  if (src) return <Cover src={src} size={coverSizes[size]} />;
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
