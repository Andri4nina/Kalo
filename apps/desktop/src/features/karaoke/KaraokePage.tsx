import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/Card";
import { PageHeader } from "@/components/PageHeader";
import { readLyrics } from "@/lib/api/lyrics";
import { useCurrentTrack, usePlayer } from "@/features/player/player.store";
import { useAsync } from "@/lib/useAsync";
import { KaraokeContent } from "./KaraokeContent";
import { activeLineIndex, parseLrc } from "./lrc";

export function KaraokePage() {
  const track = useCurrentTrack();
  const positionMs = usePlayer((state) => state.positionMs);
  const playing = usePlayer((state) => state.playing);
  const { data, loading, error } = useAsync(
    () => (track ? readLyrics(track.id) : Promise.resolve(null)),
    [track?.id],
  );
  const [offsetMs, setOffsetMs] = useState(0);
  useEffect(() => setOffsetMs(0), [track?.id]);
  const lines = useMemo(() => parseLrc(data ?? ""), [data]);
  const active = activeLineIndex(lines, positionMs, offsetMs);

  return (
    <div>
      <PageHeader eyebrow="Paroles" title="Karaoké" description="Paroles synchronisées depuis un fichier .lrc local, sans envoi réseau." />
      <Card className="p-5">
        <KaraokeContent
          track={track}
          loading={loading}
          error={error}
          lines={lines}
          active={active}
          playing={playing}
          offsetMs={offsetMs}
          onOffset={setOffsetMs}
        />
      </Card>
    </div>
  );
}
