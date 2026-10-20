import { AlertCircle, X } from "lucide-react";
import { focus } from "@/design/tokens";
import { usePlayer } from "./player.store";
import { PlayerControls } from "./PlayerControls";
import { PlayerMixer } from "./PlayerMixer";
import { PlayerProgress } from "./PlayerProgress";
import { PlayerTrackInfo } from "./PlayerTrackInfo";
import { QueueButton } from "./QueueButton";

export function PlayerBar() {
  const error = usePlayer((state) => state.error);
  const setError = usePlayer((state) => state.setError);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3">
      <section aria-label="Lecteur audio" className="mx-auto max-w-[1600px] rounded-2xl border border-kalo-line bg-kalo-panel/95 p-3 shadow-soft backdrop-blur dark:border-kalo-dark-line dark:bg-kalo-dark-panel/95">
        {error ? (
          <div role="alert" className="mb-2 flex items-center gap-2 rounded-lg bg-kalo-danger/10 px-3 py-1.5 text-xs text-kalo-danger dark:bg-kalo-dark-danger/10 dark:text-kalo-dark-danger">
            <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate">{error}</span>
            <button type="button" aria-label="Masquer l'erreur" onClick={() => setError(null)} className={`${focus} rounded`}>
              <X size={14} />
            </button>
          </div>
        ) : null}
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 md:grid-cols-[1fr_auto_1fr]">
          <div className="min-w-0"><PlayerTrackInfo /></div>
          <div className="order-3 col-span-2 flex flex-col gap-1 md:order-none md:col-span-1 md:w-[min(42vw,34rem)]">
            <PlayerControls />
            <PlayerProgress />
          </div>
          <div className="flex justify-end gap-1">
            <PlayerMixer />
            <QueueButton />
          </div>
        </div>
      </section>
    </div>
  );
}
