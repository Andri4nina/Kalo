import { Fingerprint, ScanSearch } from "lucide-react";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { DuplicateGroups } from "./DuplicateGroups";
import { useFingerprint } from "./useFingerprint";

/** Doublons exacts : contenu identique octet pour octet (empreinte BLAKE3). */
export function ContentDuplicates() {
  const { running, progress, summary, groups, error, run } = useFingerprint();
  const status = running
    ? progress ? `Lecture des fichiers : ${progress.done} / ${progress.total}` : "Préparation de l'analyse"
    : summary ? `${summary.hashed} fichier(s) lus, ${summary.errors} illisible(s).` : null;
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Button size="sm" disabled={running} onClick={() => void run()}>
          <ScanSearch size={15} aria-hidden /> {running ? "Analyse en cours" : "Analyser le contenu"}
        </Button>
        {status ? <p role="status" aria-live="polite" className={cn("text-xs", muted)}>{status}</p> : null}
      </div>
      <p className={cn("mb-4 max-w-2xl text-xs leading-relaxed", muted)}>
        Seuls les fichiers de même taille sont lus, en lecture seule. Les empreintes restent valides tant que le fichier
        n'est pas modifié. Aucun fichier n'est supprimé.
      </p>
      {error ? <ErrorNotice message={error} /> : null}
      {groups ? (
        <DuplicateGroups
          groups={groups}
          emptyIcon={Fingerprint}
          emptyTitle="Aucun fichier identique"
          emptyDescription="Aucun contenu n'est présent en double dans la bibliothèque."
        />
      ) : null}
    </div>
  );
}
