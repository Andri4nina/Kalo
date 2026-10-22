import type { LucideIcon } from "lucide-react";
import { muted } from "@/design/tokens";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
      <span className="rounded-full bg-kalo-raised p-3 dark:bg-kalo-dark-raised">
        <Icon size={22} strokeWidth={1.7} className={muted} />
      </span>
      <p className="text-base font-bold">{title}</p>
      <p className={`max-w-sm text-xs leading-relaxed ${muted}`}>{description}</p>
      {action}
    </div>
  );
}
