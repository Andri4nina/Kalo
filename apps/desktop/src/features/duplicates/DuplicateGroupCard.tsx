import { Play } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { DuplicateGroup } from "@/types";

export function DuplicateGroupCard({ group }: { group: DuplicateGroup }) {
  const playQueue = usePlayer((state) => state.playQueue);
  return (
    <section className="rounded-lg bg-kalo-card p-4 dark:bg-kalo-dark-card">
      <header className="mb-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold">{group.title}</h2>
          <p className={cn("truncate text-xs", muted)}>{group.artist ?? "Artiste inconnu"} · {group.tracks.length} fichiers</p>
        </div>
        <IconButton icon={Play} label="Lire ce groupe" size="sm" onClick={() => playQueue(group.tracks, 0, "Doublons")} />
      </header>
      <ul className="divide-y divide-kalo-line dark:divide-kalo-dark-line">
        {group.tracks.map((track) => (
          <li key={track.id} className="flex items-center gap-3 py-2 text-xs">
            <span className="w-12 shrink-0 tabular-nums text-kalo-muted dark:text-kalo-dark-muted">{formatDuration(track.durationMs)}</span>
            <span className="w-12 shrink-0 uppercase">{track.format}</span>
            <span className="min-w-0 flex-1 truncate" title={track.path}>{track.path}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}