import { Maximize2 } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { OffsetControl } from "./OffsetControl";

interface Props {
  track: Track;
  offsetMs: number;
  onOffset: (offsetMs: number) => void;
  onFullscreen: () => void;
}

export function KaraokeHeader({ track, offsetMs, onOffset, onFullscreen }: Props) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{track.title}</p>
        <p className={cn("truncate text-xs", muted)}>{track.artist ?? "Artiste inconnu"}</p>
      </div>
      <div className="flex items-center gap-2">
        <OffsetControl offsetMs={offsetMs} onChange={onOffset} />
        <IconButton icon={Maximize2} label="Passer en plein écran" onClick={onFullscreen} />
      </div>
    </div>
  );
}