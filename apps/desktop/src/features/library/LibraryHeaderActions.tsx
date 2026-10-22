import { FileInput } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonClass } from "@/components/Button";
import { listRoots } from "@/lib/api/library";
import { useAsync } from "@/lib/useAsync";
import { ImportFilesModal } from "./ImportFilesModal";
import { useImportFiles } from "./useImportFiles";

/** Importer des fichiers (copie classée) et gérer les dossiers surveillés. */
export function LibraryHeaderActions() {
  const roots = useAsync(listRoots, []);
  const imports = useImportFiles();
  const hasRoot = (roots.data?.length ?? 0) > 0;
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        disabled={!hasRoot}
        title={hasRoot ? undefined : "Ajoutez d'abord un dossier de bibliothèque"}
        onClick={() => void imports.choose()}
      >
        <FileInput size={15} aria-hidden /> Importer des fichiers
      </Button>
      <Link to="/settings/library" className={buttonClass("subtle", "sm")}>Gérer les dossiers</Link>
      {imports.sources.length > 0 && roots.data ? (
        <ImportFilesModal
          count={imports.sources.length}
          roots={roots.data}
          busy={imports.busy}
          report={imports.report}
          error={imports.error}
          onCopy={(rootId) => void imports.copy(rootId)}
          onClose={imports.close}
        />
      ) : null}
    </>
  );
}
