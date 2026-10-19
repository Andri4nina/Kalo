import { AudioLines, ArrowRight, FolderPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { formatLongDuration } from "@/lib/format";
import type { LibraryStats } from "@/types";

export function BentoHero({ stats }: { stats: LibraryStats }) {
  return (
    <Card className="relative overflow-hidden border-0 bg-kalo-accent-soft p-6 dark:bg-kalo-dark-accent-soft md:col-span-2 xl:row-span-2">
      <AudioLines
        size={190}
        strokeWidth={1}
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-6 text-kalo-accent-strong opacity-10 dark:text-kalo-dark-accent"
      />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-kalo-accent-strong dark:text-kalo-dark-accent">
            Votre bibliothèque
          </p>
          <p className="mt-3 font-display text-6xl leading-none">{stats.tracks}</p>
          <p className="mt-1 text-sm text-kalo-accent-strong dark:text-kalo-dark-accent">
            morceau{stats.tracks > 1 ? "x" : ""} indexé{stats.tracks > 1 ? "s" : ""}
          </p>
          <p className="mt-4 max-w-xs text-sm text-kalo-ink/70 dark:text-kalo-dark-ink/70">
            {stats.tracks > 0
              ? `${formatLongDuration(stats.totalDurationMs)} de musique disponible hors ligne.`
              : "Ajoutez un dossier pour commencer. Vos fichiers restent à leur place."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/library">
            <Button size="sm">Parcourir <ArrowRight size={15} /></Button>
          </Link>
          <Link to="/settings">
            <Button size="sm" variant="subtle"><FolderPlus size={15} /> Ajouter un dossier</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
