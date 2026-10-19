import { FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { RootRow } from "./RootRow";
import type { LibraryRoot } from "@/types";

interface Props {
  roots: LibraryRoot[] | undefined;
  scanningId: number | null;
  locked: boolean;
  onScan: (rootId: number) => void;
  onRemove: (root: LibraryRoot) => void;
}

export function RootsList({ roots, scanningId, locked, onScan, onRemove }: Props) {
  if (!roots?.length) {
    return (
      <EmptyState
        icon={FolderOpen}
        title="Aucun dossier indexé"
        description="Choisissez un dossier comme D:\\Music. Kalo analysera les formats audio pris en charge."
      />
    );
  }
  return (
    <div className="mt-4 space-y-2">
      {roots.map((root) => (
        <RootRow
          key={root.id}
          root={root}
          scanning={scanningId === root.id}
          locked={locked}
          onScan={() => onScan(root.id)}
          onRemove={() => onRemove(root)}
        />
      ))}
    </div>
  );
}
