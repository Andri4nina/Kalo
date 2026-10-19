import { CheckCircle2, LoaderCircle } from "lucide-react";
import { ErrorNotice } from "@/components/ErrorNotice";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { fileName } from "@/lib/fileName";
import type { ScanProgress, ScanSummary } from "@/types";

interface Props {
  scanning: boolean;
  progress: ScanProgress | null;
  summary: ScanSummary | null;
  error: string | null;
}

export function ScanStatus({ scanning, progress, summary, error }: Props) {
  if (error) return <ErrorNotice message={error} />;
  if (scanning) {
    return (
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-kalo-raised/50 px-3 py-2.5 dark:bg-kalo-dark-raised/50">
        <LoaderCircle size={16} className="shrink-0 animate-spin text-kalo-accent dark:text-kalo-dark-accent" />
        <div className="min-w-0">
          <p className="text-xs font-medium">{progress?.scanned ?? 0} fichiers examinés</p>
          <p className={cn("truncate text-[10px]", muted)}>{progress?.current ? fileName(progress.current) : "Préparation de l'analyse"}</p>
        </div>
      </div>
    );
  }
  if (!summary) return null;
  return (
    <div className="mt-3 flex items-start gap-2 rounded-xl bg-kalo-success/10 px-3 py-2.5 text-xs text-kalo-success dark:bg-kalo-dark-success/10 dark:text-kalo-dark-success">
      <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
      <p>
        {summary.filesFound} fichiers trouvés, {summary.imported} importés, {summary.updated} mis à jour
        {summary.errors > 0 ? `, ${summary.errors} illisibles` : ""}
        {summary.missing > 0 ? `, ${summary.missing} manquants` : ""}. Analyse en {Math.round(summary.durationMs / 1000)} s.
      </p>
    </div>
  );
}
