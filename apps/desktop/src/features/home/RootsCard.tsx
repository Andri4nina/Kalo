import { FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatDate } from "@/lib/dates";
import type { LibraryRoot } from "@/types";

export function RootsCard({ roots }: { roots: LibraryRoot[] }) {
  return (
    <Card className="flex flex-col p-5 md:col-span-2">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <FolderOpen size={17} className="text-kalo-accent dark:text-kalo-dark-accent" />
          <h2 className="font-display text-lg">Dossiers musicaux</h2>
        </div>
        <Link to="/settings" className={cn("text-xs hover:underline", muted)}>Gérer</Link>
      </div>
      {roots.length === 0 ? (
        <EmptyState icon={FolderOpen} title="Aucun dossier" description="Indiquez à Kalo où se trouvent vos fichiers. Aucun original n'est déplacé." />
      ) : (
        <ul className="flex flex-1 flex-col justify-center gap-2">
          {roots.map((root) => (
            <li key={root.id} className="flex items-center gap-2 rounded-xl bg-kalo-raised/50 px-3 py-2 dark:bg-kalo-dark-raised/50">
              <FolderOpen size={15} className={muted} />
              <span className="min-w-0 flex-1 truncate text-xs">{root.path}</span>
              <span className={cn("shrink-0 text-[10px]", muted)}>{formatDate(root.lastScanAt)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
