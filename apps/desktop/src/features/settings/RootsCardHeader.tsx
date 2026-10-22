import { FolderOpen, RefreshCw } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { AddRootButton } from "./AddRootButton";
import type { LibraryRoot } from "@/types";

interface Props {
  roots: LibraryRoot[] | undefined;
  scanning: boolean;
  onAdded: (root: LibraryRoot) => void;
  onScanAll: () => void;
}

export function RootsCardHeader({ roots, scanning, onAdded, onScanAll }: Props) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-start gap-2">
        <FolderOpen size={18} className="mt-0.5 text-kalo-accent dark:text-kalo-dark-accent" />
        <div>
          <h2 className="font-display font-bold tracking-tight text-lg">Bibliothèque locale</h2>
          <p className="mt-1 max-w-md text-xs text-kalo-muted dark:text-kalo-dark-muted">
            Kalo indexe les fichiers sur place. Aucun fichier n'est déplacé, renommé ou supprimé.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <AddRootButton onAdded={onAdded} disabled={scanning} />
        <IconButton icon={RefreshCw} label="Analyser tous les dossiers" disabled={!roots?.length || scanning} onClick={onScanAll} />
      </div>
    </div>
  );
}
