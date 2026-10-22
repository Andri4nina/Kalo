import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface DetailHeroProps {
  kind: string;
  title: string;
  description?: string;
  meta: React.ReactNode;
  artwork: React.ReactNode;
  children?: React.ReactNode;
}

/** En-tête de page détail : grande pochette, type, titre géant et rangée d'actions. */
export function DetailHero({ kind, title, description, meta, artwork, children }: DetailHeroProps) {
  return (
    <header className="mb-6">
      <div className="flex flex-col gap-5 rounded-lg bg-kalo-accent-soft p-5 dark:bg-kalo-dark-accent-soft sm:flex-row sm:items-end md:p-6">
        {artwork}
        <div className="min-w-0">
          <p className="text-xs font-semibold">{kind}</p>
          <h1 className="mt-1 line-clamp-3 break-words font-display text-4xl font-black leading-none tracking-tight md:text-6xl">
            {title}
          </h1>
          {description ? <p className={cn("mt-3 line-clamp-2 text-sm", muted)}>{description}</p> : null}
          <div className={cn("mt-4 text-sm", muted)}>{meta}</div>
        </div>
      </div>
      {children ? <div className="mt-5 flex flex-wrap items-center gap-3">{children}</div> : null}
    </header>
  );
}
