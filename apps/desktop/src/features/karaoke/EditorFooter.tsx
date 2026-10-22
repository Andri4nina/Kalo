import { FileDown, Save, Undo2 } from "lucide-react";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface Props {
  complete: boolean;
  edited: boolean;
  busy: boolean;
  error: string | null;
  notice: string | null;
  onSave: () => void;
  onExport: () => void;
  onRestore: () => void;
  onCancel: () => void;
}

/** Actions de l'éditeur ; l'enregistrement exige toutes les lignes marquées. */
export function EditorFooter(props: Props) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      {props.error ? <ErrorNotice message={props.error} /> : null}
      {props.notice ? <p role="status" className={cn("text-xs", muted)}>{props.notice}</p> : null}
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" disabled={!props.complete || props.busy} onClick={props.onSave}>
          <Save size={15} aria-hidden /> Enregistrer dans Kalo
        </Button>
        <Button variant="outline" size="sm" disabled={!props.complete || props.busy} onClick={props.onExport}>
          <FileDown size={15} aria-hidden /> Exporter en .lrc
        </Button>
        {props.edited ? (
          <Button variant="ghost" size="sm" disabled={props.busy} onClick={props.onRestore}>
            <Undo2 size={15} aria-hidden /> Revenir au fichier d'origine
          </Button>
        ) : null}
        <Button variant="ghost" size="sm" disabled={props.busy} onClick={props.onCancel}>Annuler</Button>
      </div>
      {!props.complete ? <p className={cn("text-xs", muted)}>Marquez toutes les lignes pour enregistrer.</p> : null}
    </div>
  );
}
