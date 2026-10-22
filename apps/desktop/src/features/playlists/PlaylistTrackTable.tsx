import { useEffect } from "react";
import { ErrorNotice } from "@/components/ErrorNotice";
import { muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { useTrackSelection } from "@/features/library/useTrackSelection";
import { trackTable } from "@/features/library/track.row.styles";
import { cn } from "@/lib/cn";
import type { Track } from "@/types";
import { PlaylistBatchBar } from "./PlaylistBatchBar";
import { PlaylistTableHead } from "./PlaylistTableHead";
import { PlaylistTrackTableBody } from "./PlaylistTrackTableBody";
import { filterRows } from "./playlist.search";
import { usePlaylistEditor } from "./usePlaylistEditor";

interface Props {
  playlistId: number;
  tracks: Track[];
  query: string;
  source: string;
}

export function PlaylistTrackTable({ playlistId, tracks, query, source }: Props) {
  const selection = useTrackSelection();
  const { error, move, remove, removeMany } = usePlaylistEditor(playlistId, tracks);
  const currentId = usePlayer((state) => state.queue[state.index]?.id);
  const rows = filterRows(tracks, query);
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
      <div className="overflow-x-auto">
        <table className={trackTable}>
          <PlaylistTableHead tracks={rows.map((row) => row.track)} selection={selection} />
          <PlaylistTrackTableBody rows={rows} total={tracks.length} reorderable={query.trim() === ""} tracks={tracks} currentId={currentId} source={source} selection={selection} onMove={move} onRemove={remove} />
        </table>
      </div>
      {rows.length === 0 ? <p className={cn("py-6 text-center text-sm", muted)}>Aucun morceau ne correspond à « {query.trim()} ».</p> : null}
    </>
  );
}
