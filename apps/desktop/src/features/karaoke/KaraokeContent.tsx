import { Captions, Music2 } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Spinner } from "@/components/Spinner";
import { muted } from "@/design/tokens";
import { audioTransport } from "@/features/player/audio.transport";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { LyricsView } from "./LyricsView";
import { OffsetControl } from "./OffsetControl";
import type { LyricLine } from "./lrc";

interface Props {
  track: Track | null;
  loading: boolean;
  error: string | null;
  lines: LyricLine[];
  active: number;
  playing: boolean;
  offsetMs: number;
  onOffset: (offsetMs: number) => void;
}

export function KaraokeContent(props: Props) {
  if (!props.track) {
    return <EmptyState icon={Music2} title="Aucun morceau en lecture" description="Lancez un morceau pour afficher ses paroles synchronisées." />;
  }
  if (props.loading) return <Spinner label="Chargement des paroles" />;
  if (props.error) return <ErrorNotice message={props.error} />;
  if (props.lines.length === 0) {
    return <EmptyState icon={Captions} title="Aucune parole synchronisée" description="Placez un fichier .lrc UTF-8 à côté du fichier audio, avec le même nom." />;
  }
  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{props.track.title}</p>
          <p className={cn("truncate text-xs", muted)}>{props.track.artist ?? "Artiste inconnu"}</p>
        </div>
        <OffsetControl offsetMs={props.offsetMs} onChange={props.onOffset} />
      </div>
      <LyricsView
        lines={props.lines}
        active={props.active}
        playing={props.playing}
        onSeek={(timeMs) => audioTransport.seek(timeMs + props.offsetMs)}
      />
    </>
  );
}
