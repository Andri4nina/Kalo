import { Download, Upload } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { RestoreDialog } from "./RestoreDialog";
import { useBackup } from "./useBackup";
import { useRestore } from "./useRestore";

export function DataCard() {
  const backup = useBackup();
  const restore = useRestore();
  const busy = backup.busy || restore.busy;

  return (
    <Card className="p-5">
      <h2 className="font-display text-lg">Données</h2>
      <p className={cn("mt-1 text-xs", muted)}>
        Sauvegardez l'index, les playlists et les favoris dans un seul fichier. Les fichiers audio et les
        pochettes ne sont pas copiés.
      </p>
      {backup.error ? <ErrorNotice message={backup.error} /> : null}
      {restore.error ? <ErrorNotice message={restore.error} /> : null}
      {backup.notice ? (
        <p role="status" className="mt-3 text-xs text-kalo-success dark:text-kalo-dark-success">{backup.notice}</p>
      ) : null}
      {restore.notice ? (
        <p role="status" className="mt-3 text-xs text-kalo-success dark:text-kalo-dark-success">{restore.notice}</p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" variant="subtle" disabled={busy} onClick={() => void backup.run()}>
          <Download size={15} /> {backup.busy ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
        <Button size="sm" variant="subtle" disabled={busy} onClick={() => void restore.choose()}>
          <Upload size={15} /> Restaurer
        </Button>
      </div>
      <RestoreDialog
        file={restore.pending}
        busy={restore.busy}
        onConfirm={() => void restore.confirm()}
        onClose={restore.cancel}
      />
    </Card>
  );
}
