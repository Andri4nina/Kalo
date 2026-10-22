import { Music2 } from "lucide-react";
import { useState } from "react";
import { assetUrl } from "@/lib/assets";
import { cn } from "@/lib/cn";

interface CoverProps {
  src: string | null | undefined;
  size?: "sm" | "md" | "lg" | "xl" | "square" | "hero";
  className?: string;
}

const sizes = {
  sm: "h-10 w-10 rounded",
  md: "h-14 w-14 rounded",
  lg: "h-24 w-24 rounded-md",
  xl: "h-40 w-full rounded-md",
  square: "aspect-square w-full rounded-md shadow-cover",
  hero: "h-36 w-36 rounded-md shadow-cover md:h-48 md:w-48",
};
const iconSizes = { sm: 16, md: 20, lg: 32, xl: 36, square: 40, hero: 56 };

export function Cover({ src, size = "md", className }: CoverProps) {
  const [failed, setFailed] = useState(false);
  const url = assetUrl(src);
  const showImage = url !== null && !failed;
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden bg-kalo-raised text-kalo-muted dark:bg-kalo-dark-raised dark:text-kalo-dark-muted",
        sizes[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Music2 size={iconSizes[size]} strokeWidth={1.6} aria-hidden="true" />
      )}
    </div>
  );
}
