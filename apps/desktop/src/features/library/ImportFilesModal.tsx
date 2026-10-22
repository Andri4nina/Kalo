import { useState } from "react";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Modal } from "@/components/Modal";
import { input, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { FileImportReport, LibraryRoot } from "@/types";
import { ImportReportView } from "./ImportReportView";

interface Props {
  count: number;
  roots: LibraryRoot[];
  busy: boolean;
  report: FileImportReport | null;
  error: string | null;
  onCopy: (rootId: number) => void;
  onClose: () => void;
}

export function ImportFilesModal({ count, roots, busy, report, error, onCopy, onClose }: Props) {
  const [rootId, setRootId] = useState(roots[0]?.id ?? 0);
  const root = roots.find((item) => item.id === rootId);
  return (
    <Modal open title="Importer des fichiers" onClose={onClose}>
      {error ? <ErrorNotice message={error} /> : null}
      {report ? <ImportReportView report={report} /> : (
        <div className="flex flex-col gap-3 text-sm">
          <p>{count} fichier(s) seront copiés, vérifiés par empreinte puis ajoutés à la bibliothèque.</p>
          <label className="flex flex-col gap-1.5 text-xs font-medium">
            Dossier de destination
            <select className={input} value={rootId} onChange={(event) => setRootId(Number(event.target.value))}>
              {roots.map((item) => <option key={item.id} value={item.id}>{item.path}</option>)}
            </select>
          </label>
          <p className={cn("break-all text-xs", muted)}>
            Classement : {root?.path ?? "…"}\Artiste\Titre.extension. Les originaux restent intacts ; un nom déjà pris reçoit un suffixe.
          </p>
        </div>
      )}
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={busy}>{report ? "Fermer" : "Annuler"}</Button>
        {report ? null : (
          <Button size="sm" disabled={busy || !root} onClick={() => onCopy(rootId)}>{busy ? "Copie en cours..." : "Copier"}</Button>
        )}
      </div>
    </Modal>
  );
}
