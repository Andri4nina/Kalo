import { FolderPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { buttonClass } from "@/components/Button";
import { heading, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatLongDuration } from "@/lib/format";
import type { LibraryStats } from "@/types";
import { greeting } from "./greeting";

export function HomeHeader({ stats }: { stats: LibraryStats | undefined }) {
  const empty = stats !== undefined && stats.tracks === 0;
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className={cn(heading, "text-3xl md:text-4xl")}>{greeting(new Date())}</h1>
        {stats ? (
          <p className={cn("mt-2 text-sm", muted)}>
            {empty
              ? "Ajoutez un dossier pour commencer. Vos fichiers restent à leur place."
              : `${stats.tracks.toLocaleString("fr-FR")} morceau${stats.tracks > 1 ? "x" : ""} · ${formatLongDuration(stats.totalDurationMs)} de musique hors ligne`}
          </p>
        ) : null}
      </div>
      {empty ? (
        <Link to="/settings/library" className={buttonClass("primary", "sm")}>
          <FolderPlus size={15} aria-hidden="true" /> Ajouter un dossier
        </Link>
      ) : null}
    </header>
  );
}
