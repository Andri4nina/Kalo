import { AlertCircle, X } from "lucide-react";
import { focus } from "@/design/tokens";
import { usePlayer } from "./player.store";
import { PlayerControls } from "./PlayerControls";
import { PlayerExtras } from "./PlayerExtras";
import { PlayerMixer } from "./PlayerMixer";
import { PlayerProgress } from "./PlayerProgress";
import { PlayerTrackInfo } from "./PlayerTrackInfo";
import { QueueButton } from "./QueueButton";

export function PlayerBar() {
  const error = usePlayer((state) => state.error);
  const setError = usePlayer((state) => state.setError);

  return (
    <section aria-label="Lecteur audio" className="shrink-0 px-2 pb-1">
      {error ? (
        <div role="alert" className="mb-2 flex items-center gap-2 rounded-md bg-kalo-danger/10 px-3 py-1.5 text-xs text-kalo-danger dark:bg-kalo-dark-danger/15 dark:text-kalo-dark-danger">
          <AlertCircle size={14} className="shrink-0" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate">{error}</span>
          <button type="button" aria-label="Masquer l'erreur" onClick={() => setError(null)} className={`${focus} rounded`}>
            <X size={14} />
          </button>
        </div>
      ) : null}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)]">
        <div className="min-w-0"><PlayerTrackInfo /></div>
        <div className="order-3 col-span-2 flex flex-col gap-0.5 md:order-none md:col-span-1">
          <PlayerControls />
          <div className="mx-auto w-full max-w-[42rem]"><PlayerProgress /></div>
        </div>
        <div className="flex items-center justify-end gap-0.5">
          <PlayerExtras />
          <QueueButton />
          <PlayerMixer />
        </div>
      </div>
    </section>
  );
}
