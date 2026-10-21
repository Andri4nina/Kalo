import { Card } from "@/components/Card";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { SelectAllCell } from "./SelectAllCell";
import { TrackRow } from "./TrackRow";
import type { TrackSelection } from "./useTrackSelection";
const columns = ["#", "Titre", "Artiste", "Album", "Format", "Durée", ""];
interface Props {
  tracks: Track[];
  selection?: TrackSelection;
}
export function TrackTable({ tracks, selection }: Props) {
  const currentId = usePlayer((state) => state.queue[state.index]?.id);
  const allSelected = tracks.length > 0 && tracks.every((track) => selection?.selected.has(track.id));
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-kalo-raised/50 dark:bg-kalo-dark-raised/50">
            <tr>
              {selection ? <SelectAllCell checked={allSelected} onToggle={() => selection.toggleAll(tracks.map((track) => track.id))} /> : null}
              {columns.map((label, index) => (
                <th
                  key={`${label}-${index}`}
                  scope="col"
                  className={`px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-kalo-muted dark:text-kalo-dark-muted ${index === 3 ? "hidden lg:table-cell" : ""} ${index === 4 ? "hidden sm:table-cell" : ""} ${index === 5 ? "text-right" : ""}`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tracks.map((track, index) => (
              <TrackRow
                key={track.id}
                track={track}
                index={index}
                queue={tracks}
                current={track.id === currentId}
                selected={selection?.selected.has(track.id)}
                onToggle={selection ? () => selection.toggle(track.id) : undefined}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
