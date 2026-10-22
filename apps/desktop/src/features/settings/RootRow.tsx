import { Folder, RefreshCw, Trash2 } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/dates";
import type { LibraryRoot } from "@/types";

interface Props {
  root: LibraryRoot;
  scanning: boolean;
  locked: boolean;
  onScan: () => void;
  onRemove: () => void;
}

export function RootRow({ root, scanning, locked, onScan, onRemove }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-kalo-raised/50 px-3 py-2 dark:bg-kalo-dark-raised/50">
      <Folder size={16} className="shrink-0 text-kalo-accent dark:text-kalo-dark-accent" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium">{root.path}</p>
        <p className={cn("text-[10px]", muted)}>
          {scanning ? "Analyse en cours" : `Dernière analyse : ${formatDate(root.lastScanAt)}`}
        </p>
      </div>
      <IconButton icon={RefreshCw} label="Analyser ce dossier" size="sm" disabled={scanning} onClick={onScan} />
      <IconButton icon={Trash2} label="Retirer de la bibliothèque" size="sm" disabled={locked} onClick={onRemove} />
    </div>
  );
}
