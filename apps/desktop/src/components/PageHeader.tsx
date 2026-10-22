import { heading, muted } from "@/design/tokens";
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
      <div className="min-w-0">
        {eyebrow ? (
          <p className={cn("mb-1 text-xs font-semibold", muted)}>{eyebrow}</p>
        ) : null}
        <h1 className={cn(heading, "text-3xl leading-tight md:text-4xl")}>{title}</h1>
        {description ? <p className={cn("mt-2 text-sm", muted)}>{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
