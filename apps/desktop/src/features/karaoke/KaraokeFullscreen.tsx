import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { PlayPauseButton } from "@/features/player/PlayPauseButton";
import { audioTransport } from "@/features/player/audio.transport";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { LyricsView } from "./LyricsView";
import { OffsetControl } from "./OffsetControl";
import type { LyricLine } from "./lrc";

interface Props {
  open: boolean;
  track: Track | null;
  lines: LyricLine[];
  active: number;
  playing: boolean;
  offsetMs: number;
  onOffset: (offsetMs: number) => void;
  onClose: () => void;
}

export function KaraokeFullscreen({ open, track, lines, active, playing, offsetMs, onOffset, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, onClose]);
  if (!open || !track) return null;
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Karaoké plein écran" className="fixed inset-0 z-[60] flex flex-col bg-kalo-canvas p-4 text-kalo-ink dark:bg-kalo-dark-canvas dark:text-kalo-dark-ink md:p-8">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-display text-xl">{track.title}</h2>
          <p className={cn("truncate text-xs", muted)}>{track.artist ?? "Artiste inconnu"}</p>
        </div>
        <div className="flex items-center gap-2">
          <PlayPauseButton />
          <OffsetControl offsetMs={offsetMs} onChange={onOffset} />
          <IconButton icon={X} label="Quitter le plein écran" onClick={onClose} />
        </div>
      </header>
      <LyricsView variant="fullscreen" lines={lines} active={active} playing={playing} onSeek={(timeMs) => audioTransport.seek(timeMs + offsetMs)} />
    </div>,
    document.body,
  );
}