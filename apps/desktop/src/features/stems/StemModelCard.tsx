import { Download, Trash2, X } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { formatBytes } from "@/lib/bytes";
import type { StemModel } from "./useStemModel";

/** Modèle local : rien n'est téléchargé sans l'accord explicite de l'utilisateur. */
export function StemModelCard({ model }: { model: StemModel }) {
  const status = model.status;
  const percent = model.progress && model.progress.total > 0 ? Math.round((model.progress.done / model.progress.total) * 100) : null;
  return (
    <Card className="p-5">
      <h2 className="font-display text-lg font-bold tracking-tight">Modèle de séparation</h2>
      <p className={cn("mt-1 text-xs leading-relaxed", muted)}>
        Spleeter 4 pistes (Deezer) au format ONNX, exécuté sur cet appareil : aucun son n'est envoyé en ligne. Source :{" "}
        {status?.source ?? "…"}. Licence : {status?.license ?? "…"}.
      </p>
      {model.error ? <div className="mt-3"><ErrorNotice message={model.error} /></div> : null}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {status?.installed ? (
          <>
            <span className="text-sm font-semibold">Installé · {formatBytes(status.installedBytes)}</span>
            <Button variant="ghost" size="sm" disabled={model.busy} onClick={() => void model.uninstall()}>
              <Trash2 size={14} aria-hidden /> Désinstaller
            </Button>
          </>
        ) : (
          <Button size="sm" disabled={model.busy || !status} onClick={() => void model.install()}>
            <Download size={15} aria-hidden /> {model.busy ? "Téléchargement…" : `Télécharger (${formatBytes(status?.downloadBytes ?? 0)})`}
          </Button>
        )}
        {model.busy && percent !== null ? (
          <>
            <span role="status" className={cn("text-xs tabular-nums", muted)}>{percent} %</span>
            <Button variant="ghost" size="sm" onClick={model.cancel}><X size={14} aria-hidden /> Annuler</Button>
          </>
        ) : null}
      </div>
    </Card>
  );
}
