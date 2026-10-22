import { AlertCircle, FolderSearch, RotateCw, SkipForward, X } from "lucide-react";
import { RelocateErrorModal } from "@/features/library/RelocateErrorModal";
import { useRelocateTrack } from "@/features/library/useRelocateTrack";
import { focus } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { READ_ERROR } from "./audio.events";
import { retryCurrent } from "./audio.retry";
import { useCurrentTrack, usePlayer } from "./player.store";

const action = cn(focus, "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold hover:bg-kalo-danger/15 dark:hover:bg-kalo-dark-danger/20");

/** Erreur de lecture avec des actions concrètes : réessayer, localiser, passer. */
export function PlayerErrorBanner({ error }: { error: string }) {
  const track = useCurrentTrack();
  const hasNext = usePlayer((state) => state.queue.length > 1);
  const { setError, next } = usePlayer.getState();
  const relocate = useRelocateTrack(track);
  const readError = error === READ_ERROR && track !== null;
  return (
    <div role="alert" className="mb-2 flex flex-wrap items-center gap-2 rounded-md bg-kalo-danger/10 px-3 py-1.5 text-xs text-kalo-danger dark:bg-kalo-dark-danger/15 dark:text-kalo-dark-danger">
      <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate">{error}</span>
      {readError ? (
        <>
          <button type="button" className={action} onClick={retryCurrent}><RotateCw size={12} aria-hidden /> Réessayer</button>
          <button type="button" className={action} onClick={() => void relocate.pick().then((done) => done && setError(null))}>
            <FolderSearch size={12} aria-hidden /> Localiser le fichier
          </button>
        </>
      ) : null}
      {hasNext ? <button type="button" className={action} onClick={() => { setError(null); next(); }}><SkipForward size={12} aria-hidden /> Suivant</button> : null}
      <button type="button" aria-label="Masquer l'erreur" onClick={() => setError(null)} className={cn(focus, "rounded")}>
        <X size={14} />
      </button>
      <RelocateErrorModal error={relocate.error} onClose={relocate.clearError} />
    </div>
  );
}
