import { FolderPlus } from "lucide-react";
import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { addRoot } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import type { LibraryRoot } from "@/types";

export function AddRootButton({ onAdded, disabled = false }: { onAdded: (root: LibraryRoot) => void; disabled?: boolean }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const choose = async () => {
    setError(null);
    try {
      const selected = await open({ directory: true, multiple: false, title: "Choisir un dossier musical" });
      if (typeof selected !== "string") return;
      setBusy(true);
      const root = await addRoot(selected);
      onAdded(root);
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {error ? <ErrorNotice message={error} /> : null}
      <Button size="sm" disabled={busy || disabled} onClick={() => void choose()}>
        <FolderPlus size={15} /> {busy ? "Ajout..." : "Ajouter un dossier"}
      </Button>
    </div>
  );
}
