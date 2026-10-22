import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import type { DuplicateGroup } from "@/types";
import { DuplicateGroupCard } from "./DuplicateGroupCard";

interface Props {
  groups: DuplicateGroup[];
  emptyIcon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
}

/** Grille de groupes de doublons, avec un état vide explicite. */
export function DuplicateGroups({ groups, emptyIcon, emptyTitle, emptyDescription }: Props) {
  if (groups.length === 0) {
    return (
      <Card>
        <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
      </Card>
    );
  }
  return (
    <div className="grid gap-3 xl:grid-cols-2">
      {groups.map((group) => <DuplicateGroupCard key={group.key} group={group} />)}
    </div>
  );
}
