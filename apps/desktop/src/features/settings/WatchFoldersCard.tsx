import { FolderSync } from "lucide-react";
import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { SwitchRow } from "@/components/SwitchRow";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useFolderWatchPrefs } from "./watch.store";

export function WatchFoldersCard() {
  const { enabled, error, setEnabled } = useFolderWatchPrefs();
  return (
    <Card className="mt-4 p-5">
      <h2 className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
        <FolderSync size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Surveillance des dossiers
      </h2>
      <p className={cn("mt-1 text-xs leading-relaxed", muted)}>
        Kalo suit les ajouts, modifications et suppressions dans vos dossiers et met la bibliothèque à jour, en lecture
        seule. Un fichier disparu reste référencé et marqué introuvable.
      </p>
      <SwitchRow
        label="Mettre à jour automatiquement"
        description="Les changements sont appliqués après 1,5 seconde sans nouvelle activité."
        checked={enabled}
        onChange={setEnabled}
      />
      {error ? <div className="mt-3"><ErrorNotice message={error} /></div> : null}
    </Card>
  );
}
