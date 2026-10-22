import { SlidersVertical, Trash2, X } from "lucide-react";
import { Button } from "@/components/Button";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { StemJob, StemProgress } from "@/types";

const LABELS = { running: "En cours", done: "Terminée", failed: "Échec", cancelled: "Annulée" } as const;

interface Props {
  job: StemJob;
  progress: StemProgress | null;
  selected: boolean;
  onOpen: () => void;
  onCancel: () => void;
  onDelete: () => void;
}

export function StemJobRow({ job, progress, selected, onOpen, onCancel, onDelete }: Props) {
  const live = progress?.jobId === job.id && progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : null;
  return (
    <li className={cn("flex flex-wrap items-center gap-3 rounded-md px-3 py-2", selected ? "bg-kalo-raised dark:bg-kalo-dark-raised" : "hover:bg-kalo-raised/60 dark:hover:bg-kalo-dark-raised/60")}>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{job.title}</p>
        <p className={cn("truncate text-xs", job.status === "failed" ? "text-kalo-danger dark:text-kalo-dark-danger" : muted)}>
          {job.artist ?? "Artiste inconnu"} · {LABELS[job.status]}
          {live !== null ? ` · ${live} %` : ""}
          {job.error ? ` · ${job.error}` : ""}
        </p>
      </div>
      {job.status === "done" ? (
        <Button variant={selected ? "primary" : "outline"} size="sm" onClick={onOpen}>
          <SlidersVertical size={14} aria-hidden /> Mixer
        </Button>
      ) : null}
      {job.status === "running" ? (
        <Button variant="ghost" size="sm" onClick={onCancel}><X size={14} aria-hidden /> Annuler</Button>
      ) : (
        <IconButton icon={Trash2} label={`Supprimer la séparation de ${job.title}`} size="sm" onClick={onDelete} />
      )}
    </li>
  );
}
