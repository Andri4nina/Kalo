import { useEffect, useRef } from "react";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { LyricLine } from "./lrc";

interface Props {
  lines: LyricLine[];
  active: number;
  playing: boolean;
  onSeek: (timeMs: number) => void;
  variant?: "default" | "fullscreen";
}

export function LyricsView({ lines, active, playing, onSeek, variant = "default" }: Props) {
  const items = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!playing || active < 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    items.current[active]?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [active, playing]);

  return (
    <div className={cn("overflow-y-auto rounded-lg border border-kalo-line bg-kalo-canvas/50 dark:border-kalo-dark-line dark:bg-kalo-dark-canvas/50", variant === "fullscreen" ? "max-h-[74vh] p-4" : "max-h-[58vh] p-2")}>
      <ol className="space-y-0.5">
        {lines.map((line, index) => (
          <li key={`${line.timeMs}-${index}`}>
            <button
              ref={(element) => { items.current[index] = element; }}
              type="button"
              onClick={() => onSeek(line.timeMs)}
              aria-current={index === active ? "true" : undefined}
              className={cn(
                "w-full rounded-md text-left transition-colors",
                focus,
                variant === "fullscreen" ? "px-4 py-3 text-2xl md:text-3xl" : "px-3 py-2 text-sm",
                index === active
                  ? "bg-kalo-accent-soft font-semibold text-kalo-accent-strong dark:bg-kalo-dark-accent-soft dark:text-kalo-dark-accent"
                  : cn("hover:bg-kalo-raised/60 dark:hover:bg-kalo-dark-raised/60", muted),
              )}
            >
              {line.text || "…"}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
