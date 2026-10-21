import { ListMusic, Trash2, X } from "lucide-react";
import { IconButton } from "@/components/IconButton";

interface Props {
  count: number;
  source?: string | null;
  onClear: () => void;
  onClose: () => void;
}

export function QueueHeader({ count, source, onClear, onClose }: Props) {
  return (
    <header className="flex items-center justify-between gap-3 p-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <ListMusic size={18} className="text-kalo-accent dark:text-kalo-dark-accent" />
          <h2 className="font-display text-lg">File d'attente</h2>
          <span className="text-xs text-kalo-muted dark:text-kalo-dark-muted">{count}</span>
        </div>
        {source ? (
          <p className="mt-0.5 truncate text-[11px] text-kalo-muted dark:text-kalo-dark-muted">Depuis {source}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-1">
        <IconButton icon={Trash2} label="Vider la file" onClick={onClear} disabled={count === 0} />
        <IconButton icon={X} label="Fermer" onClick={onClose} />
      </div>
    </header>
  );
}
