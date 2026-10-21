import { History } from "lucide-react";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { usePlayer } from "./player.store";

export function QueueHistory({ tracks }: { tracks: Track[] }) {
  const replayHistory = usePlayer((state) => state.replayHistory);
  if (tracks.length === 0) return null;
  return (
    <section className="border-t border-kalo-line px-3 py-3 dark:border-kalo-dark-line">
      <h3 className="mb-1 flex items-center gap-2 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-kalo-muted dark:text-kalo-dark-muted">
        <History size={12} aria-hidden />
        Écoutés récemment
      </h3>
      <ul>
        {tracks.slice(0, 5).map((track, index) => (
          <li key={`${track.id}-${index}`}>
            <button
              type="button"
              onClick={() => replayHistory(track)}
              className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-kalo-raised dark:hover:bg-kalo-dark-raised", focus)}
            >
              <span className="min-w-0 flex-1 truncate text-xs font-medium">{track.title}</span>
              <span className={cn("shrink-0 truncate text-[11px]", muted)}>{track.artist ?? "Artiste inconnu"}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
