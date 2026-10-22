import { Plus } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Spinner } from "@/components/Spinner";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Playlist } from "@/types";

interface Props {
  playlists: Playlist[];
  busy: boolean;
  onSelect: (playlistId: number) => void;
}

export function PlaylistChoices({ playlists, busy, onSelect }: Props) {
  if (playlists.length === 0) {
    return <EmptyState icon={Plus} title="Aucune playlist" description="Créez votre première playlist ci-dessous." />;
  }
  return (
    <div className="max-h-56 space-y-1 overflow-y-auto">
      {playlists.map((playlist) => (
        <button
          key={playlist.id}
          type="button"
          disabled={busy}
          onClick={() => onSelect(playlist.id)}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-kalo-raised disabled:opacity-50 dark:hover:bg-kalo-dark-raised"
        >
          <span className="truncate">{playlist.name}</span>
          <span className={cn("text-xs", muted)}>{playlist.trackCount}</span>
        </button>
      ))}
      {busy ? <Spinner label="Ajout" /> : null}
    </div>
  );
}
