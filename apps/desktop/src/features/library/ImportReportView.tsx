import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { FileImportReport } from "@/types";

/** Bilan d'import : copiés, déjà présents, échecs avec leur raison. */
export function ImportReportView({ report }: { report: FileImportReport }) {
  return (
    <div role="status" className="flex flex-col gap-3 text-sm">
      <p>
        <strong>{report.copied}</strong> fichier(s) copié(s) et vérifié(s),{" "}
        <strong>{report.alreadyPresent}</strong> déjà présent(s).
      </p>
      {report.failed.length > 0 ? (
        <div>
          <p className="mb-1 font-semibold text-kalo-danger dark:text-kalo-dark-danger">
            {report.failed.length} fichier(s) non importé(s)
          </p>
          <ul className="max-h-40 overflow-y-auto text-xs">
            {report.failed.map((failure) => (
              <li key={failure.path} className="py-1">
                <span className="block truncate" title={failure.path}>{failure.path}</span>
                <span className={muted}>{failure.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className={cn("text-xs", muted)}>Les fichiers d'origine n'ont été ni déplacés ni supprimés.</p>
    </div>
  );
}
