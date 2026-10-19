import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

const head = "px-3 py-2.5 text-[10px] uppercase tracking-[0.12em]";

export function PlaylistTableHead() {
  return (
    <thead className="bg-kalo-raised/50 dark:bg-kalo-dark-raised/50">
      <tr>
        <th className={cn(head, muted)}>#</th>
        <th className={cn(head, muted)}>Titre</th>
        <th className={cn(head, muted, "hidden md:table-cell")}>Artiste</th>
        <th className={cn(head, muted, "hidden text-right sm:table-cell")}>Durée</th>
        <th className={head}><span className="sr-only">Actions</span></th>
      </tr>
    </thead>
  );
}
