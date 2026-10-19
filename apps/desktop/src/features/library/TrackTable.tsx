import { Card } from "@/components/Card";
import { usePlayer } from "@/features/player/player.store";
import type { Track } from "@/types";
import { TrackRow } from "./TrackRow";

const columns = ["#", "Titre", "Artiste", "Album", "Format", "Durée", ""];

export function TrackTable({ tracks }: { tracks: Track[] }) {
  const currentId = usePlayer((state) => state.queue[state.index]?.id);
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-kalo-raised/50 dark:bg-kalo-dark-raised/50">
            <tr>
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
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
