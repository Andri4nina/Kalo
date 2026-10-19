import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-kalo-accent dark:text-kalo-dark-accent">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl leading-tight">{title}</h1>
        {description ? <p className={cn("mt-1 text-sm", muted)}>{description}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  );
}
