import { useEffect, useState } from "react";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { KaraokeContent } from "./KaraokeContent";
import { KaraokeFullscreen } from "./KaraokeFullscreen";
import { loadKaraokeOffset, saveKaraokeOffset } from "./karaoke.prefs";
import { activeLineIndex } from "./lrc";
import type { KaraokeLyrics } from "./useKaraokeLyrics";

/** Affichage en direct : ligne active, décalage mémorisé, plein écran. */
export function KaraokeLive({ track, lyrics }: { track: Track | null; lyrics: KaraokeLyrics }) {
  const positionMs = usePlayer((state) => state.positionMs);
  const playing = usePlayer((state) => state.playing);
  const [offsetMs, setOffsetMs] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => setOffsetMs(track ? loadKaraokeOffset(track.id) : 0), [track?.id]);
  const changeOffset = (value: number) => {
    setOffsetMs(value);
    if (track) saveKaraokeOffset(track.id, value);
  };
  const active = activeLineIndex(lyrics.lines, positionMs, offsetMs);
  return (
    <>
      <KaraokeContent
        track={track}
        loading={lyrics.loading}
        error={lyrics.error}
        lines={lyrics.lines}
        plainText={lyrics.plainText}
        active={active}
        playing={playing}
        offsetMs={offsetMs}
        onOffset={changeOffset}
        onFullscreen={() => setFullscreen(true)}
      />
      <KaraokeFullscreen open={fullscreen} track={track} lines={lyrics.lines} active={active} playing={playing} offsetMs={offsetMs} onOffset={changeOffset} onClose={() => setFullscreen(false)} />
    </>
  );
}
