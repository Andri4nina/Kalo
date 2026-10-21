import { useEffect } from "react";
import { Card } from "@/components/Card";
import { ErrorNotice } from "@/components/ErrorNotice";
import { usePlayer } from "@/features/player/player.store";
import { useTrackSelection } from "@/features/library/useTrackSelection";
import type { Track } from "@/types";
import { PlaylistBatchBar } from "./PlaylistBatchBar";
import { PlaylistTableHead } from "./PlaylistTableHead";
import { PlaylistTrackTableBody } from "./PlaylistTrackTableBody";
import { usePlaylistEditor } from "./usePlaylistEditor";

interface Props {
  playlistId: number;
  tracks: Track[];
  source: string;
}

export function PlaylistTrackTable({ playlistId, tracks, source }: Props) {
  const selection = useTrackSelection();
  const { error, move, remove, removeMany } = usePlaylistEditor(playlistId, tracks);
  const currentId = usePlayer((state) => state.queue[state.index]?.id);
  const selectedTracks = tracks.filter((track) => selection.selected.has(track.id));
  const signature = tracks.map((track) => track.id).join(",");
  useEffect(() => selection.clear(), [signature]);
  const removeSelected = () => removeMany(selectedTracks.map((track) => track.id));

  return (
    <>
      {error && selectedTracks.length === 0 ? <ErrorNotice message={error} /> : null}
      {selectedTracks.length > 0 ? (
        <PlaylistBatchBar tracks={selectedTracks} error={error} onRemove={removeSelected} onClear={selection.clear} />
      ) : null}
      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <PlaylistTableHead tracks={tracks} selection={selection} />
            <PlaylistTrackTableBody tracks={tracks} currentId={currentId} source={source} selection={selection} onMove={move} onRemove={remove} />
          </table>
        </div>
      </Card>
    </>
  );
}
