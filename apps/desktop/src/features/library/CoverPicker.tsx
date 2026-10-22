import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/Button";
import { Cover } from "@/components/Cover";
import { ErrorNotice } from "@/components/ErrorNotice";
import { setTrackCover } from "@/lib/api/library";
import { errorMessage } from "@/lib/format";
import { pickImage } from "@/lib/pickImage";
import type { Track } from "@/types";
import { useLibraryVersion } from "./library.store";

export function CoverPicker({ track, onDone }: { track: Track; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);
  const choose = async () => {
    const source = await pickImage();
    if (!source) return;
    setBusy(true);
    setError(null);
    try {
      await setTrackCover(track.id, source);
      bump();
      onDone();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="mb-4 flex flex-wrap items-start gap-3">
      <Cover src={track.coverPath} size="lg" />
      <div className="min-w-0 flex-1">
        <Button variant="subtle" size="sm" disabled={busy} onClick={() => void choose()}>
          <ImagePlus size={14} aria-hidden />
          {busy ? "Copie..." : "Changer la pochette"}
        </Button>
        <p className="mt-1 text-[11px] text-kalo-muted dark:text-kalo-dark-muted">
          L'image est copiée dans le cache Kalo ; le fichier audio n'est pas modifié.
        </p>
        {error ? <div className="mt-2"><ErrorNotice message={error} /></div> : null}
      </div>
    </div>
  );
}
