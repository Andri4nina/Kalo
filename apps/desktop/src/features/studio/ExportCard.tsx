import { Download } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useExportWav } from "./useExportWav";

export function ExportCard() {
  const { track, busy, error, notice, run } = useExportWav();
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
        <Download size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Export audio
      </h2>
      <p className={cn("mt-1 text-xs", muted)}>
        Rendu hors ligne du morceau en cours avec les réglages actuels, dans un nouveau fichier WAV. Le fichier d'origine n'est jamais modifié.
      </p>
      <p className={cn("mt-2 text-xs", muted)}>{track ? `Morceau : ${track.title}` : "Aucun morceau en lecture."}</p>
      {error ? <p className="mt-2 text-xs text-kalo-danger dark:text-kalo-dark-danger">{error}</p> : null}
      {notice ? <p className="mt-2 text-xs text-kalo-accent-strong dark:text-kalo-dark-accent">{notice}</p> : null}
      <Button className="mt-3" size="sm" variant="subtle" disabled={busy || !track} onClick={() => void run()}>
        <Download size={14} aria-hidden />
        {busy ? "Export en cours..." : "Exporter en WAV"}
      </Button>
    </Card>
  );
}
