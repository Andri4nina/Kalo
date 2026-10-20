import { ListMusic, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Playlist } from "@/types";

export function PlaylistCard({ playlist, onDelete }: { playlist: Playlist; onDelete: () => void }) {
  return (
    <Card className="flex items-center gap-3 p-3 transition-colors hover:bg-kalo-raised/40 dark:hover:bg-kalo-dark-raised/40">
      <Link to={`/playlists/${playlist.id}`} className={`${focus} flex min-w-0 flex-1 items-center gap-3 rounded-xl`}>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-kalo-accent-soft text-kalo-accent-strong dark:bg-kalo-dark-accent-soft dark:text-kalo-dark-accent">
          <ListMusic size={22} strokeWidth={1.7} />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{playlist.name}</span>
          <span className={cn("block text-xs", muted)}>
            {playlist.trackCount} morceau{playlist.trackCount > 1 ? "x" : ""}
          </span>
        </span>
      </Link>
      <IconButton icon={Trash2} label="Supprimer la playlist" size="sm" onClick={onDelete} />
    </Card>
  );
}
