import { Pause, Play, Trash2, X } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { formatBytes } from "@/lib/bytes";
import { cn } from "@/lib/cn";
import type { DownloadEntry, DownloadProgress } from "@/types";

const LABELS = { queued: "En attente", running: "En cours", paused: "En pause", done: "Rangé dans la bibliothèque", failed: "Échec", cancelled: "Annulé" } as const;

const bar = "h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-kalo-raised [&::-webkit-progress-value]:bg-kalo-accent dark:[&::-webkit-progress-bar]:bg-kalo-dark-raised dark:[&::-webkit-progress-value]:bg-kalo-dark-accent";

interface Props {
  entry: DownloadEntry;
  live: DownloadProgress | undefined;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
  onRemove: () => void;
}

export function DownloadRow({ entry, live, onPause, onResume, onCancel, onRemove }: Props) {
  const running = entry.status === "running" || entry.status === "queued";
  const received = live?.received ?? entry.received;
  const total = live?.total ?? entry.total;
  const detail = running && total ? `${formatBytes(received)} / ${formatBytes(total)}${live ? ` · ${formatBytes(live.bytesPerSecond)}/s` : ""}` : LABELS[entry.status];
  return (
    <li className="rounded-md bg-kalo-raised/60 px-3 py-2 dark:bg-kalo-dark-raised/60">
      <div className="flex items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold" title={entry.url}>{entry.fileName}</p>
          <p className={cn("truncate text-xs", entry.status === "failed" ? "text-kalo-danger dark:text-kalo-dark-danger" : muted)}>
            {detail}{entry.error ? ` · ${entry.error}` : ""}{entry.license ? ` · ${entry.license}` : ""}
          </p>
        </div>
        {running ? <IconButton icon={Pause} label={`Mettre en pause ${entry.fileName}`} size="sm" onClick={onPause} /> : null}
        {entry.status === "paused" || entry.status === "failed" ? <IconButton icon={Play} label={`Reprendre ${entry.fileName}`} size="sm" onClick={onResume} /> : null}
        {running || entry.status === "paused" ? <IconButton icon={X} label={`Annuler ${entry.fileName}`} size="sm" onClick={onCancel} /> : null}
        {!running ? <IconButton icon={Trash2} label={`Retirer ${entry.fileName} de la liste`} size="sm" onClick={onRemove} /> : null}
      </div>
      {running || entry.status === "paused" ? (
        <progress className={cn("mt-2", bar)} value={received} max={total ?? undefined} aria-label={`Progression de ${entry.fileName}`} />
      ) : null}
    </li>
  );
}
