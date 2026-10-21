import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { PlaylistTableHead } from "./PlaylistTableHead";
import { PlaylistTrackRow } from "./PlaylistTrackRow";
import { usePlaylistEditor } from "./usePlaylistEditor";

interface Props {
  playlistId: number;
  tracks: Track[];
  source: string;
}

export function PlaylistTrackTable({ playlistId, tracks, source }: Props) {
  const { error, move, remove } = usePlaylistEditor(playlistId, tracks);
  const playTrack = usePlayer((state) => state.playTrack);
  const currentId = usePlayer((state) => state.queue[state.index]?.id);

  return (
    <>
      {error ? <ErrorNotice message={error} /> : null}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <PlaylistTableHead />
            <tbody>
              {tracks.map((track, index) => (
                <PlaylistTrackRow
                  key={track.id}
                  track={track}
                  index={index}
                  current={track.id === currentId}
                  canUp={index > 0}
                  canDown={index < tracks.length - 1}
                  onPlay={() => playTrack(track, tracks, source)}
                  onMove={(direction) => move(index, direction)}
                  onRemove={() => remove(track.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
