import { usePlayer } from "./player.store";
import { PlayerControls } from "./PlayerControls";
import { PlayerErrorBanner } from "./PlayerErrorBanner";
import { PlayerExtras } from "./PlayerExtras";
import { PlayerMixer } from "./PlayerMixer";
import { PlayerProgress } from "./PlayerProgress";
import { PlayerTrackInfo } from "./PlayerTrackInfo";
import { QueueButton } from "./QueueButton";

export function PlayerBar() {
  const error = usePlayer((state) => state.error);

  return (
    <section aria-label="Lecteur audio" className="shrink-0 px-2 pb-1">
      {error ? <PlayerErrorBanner error={error} /> : null}
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
