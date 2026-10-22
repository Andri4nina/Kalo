import { Captions, Music2 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { audioTransport } from "@/features/player/audio.transport";
import type { Track } from "@/types";
import { KaraokeHeader } from "./KaraokeHeader";
import { LyricsView } from "./LyricsView";
import { PlainLyrics } from "./PlainLyrics";
import type { LyricLine } from "./lrc";

interface Props {
  track: Track | null;
  loading: boolean;
  error: string | null;
  lines: LyricLine[];
  plainText: string;
  active: number;
  playing: boolean;
  offsetMs: number;
  onOffset: (offsetMs: number) => void;
  onFullscreen: () => void;
}

export function KaraokeContent(props: Props) {
  if (!props.track) {
    return <EmptyState icon={Music2} title="Aucun morceau en lecture" description="Lancez un morceau pour afficher ses paroles synchronisées." />;
  }
  if (props.loading) return <Spinner label="Chargement des paroles" />;
  if (props.error) return <ErrorNotice message={props.error} />;
  if (props.lines.length === 0 && props.plainText) return <PlainLyrics text={props.plainText} />;
  if (props.lines.length === 0) {
    return <EmptyState icon={Captions} title="Aucune parole" description="Placez un fichier .lrc ou .txt à côté du fichier audio, ou utilisez « Synchroniser » pour saisir les paroles." />;
  }
  return (
    <>
      <KaraokeHeader track={props.track} offsetMs={props.offsetMs} onOffset={props.onOffset} onFullscreen={props.onFullscreen} />
      <LyricsView
        lines={props.lines}
        active={props.active}
        playing={props.playing}
        onSeek={(timeMs) => audioTransport.seek(timeMs + props.offsetMs)}
      />
    </>
  );
}
