import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}

export function StatTile({ icon: Icon, label, value, detail }: StatTileProps) {
  return (
    <Card className="flex flex-col justify-between gap-4 p-5">
      <div className="flex items-center justify-between">
        <span className={cn("text-[11px] font-medium uppercase tracking-[0.14em]", muted)}>{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-kalo-raised text-kalo-accent-strong dark:bg-kalo-dark-raised dark:text-kalo-dark-accent">
          <Icon size={15} strokeWidth={1.9} />
        </span>
      </div>
      <div>
        <p className="font-display text-3xl leading-none">{value}</p>
        <p className={cn("mt-1.5 text-xs", muted)}>{detail}</p>
      </div>
    </Card>
  );
}
