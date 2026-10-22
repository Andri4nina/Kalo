import { ConfirmModal } from "@/components/ConfirmModal";
import { ErrorNotice } from "@/components/ErrorNotice";
import { mediaGrid } from "@/design/tokens";
import type { Playlist } from "@/types";
import { PlaylistCard } from "./PlaylistCard";
import { usePlaylistDelete } from "./usePlaylistDelete";

export function PlaylistsGrid({ playlists }: { playlists: Playlist[] }) {
  const { toDelete, setToDelete, busy, error, remove } = usePlaylistDelete();
  return (
    <>
      {error ? <ErrorNotice message={error} /> : null}
      <div className={mediaGrid}>
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} onDelete={() => setToDelete(playlist)} />
        ))}
      </div>
      <ConfirmModal
        open={toDelete !== null}
        title="Supprimer la playlist"
        description="La playlist sera retirée de Kalo. Les fichiers audio restent intacts sur votre disque."
        confirmLabel="Supprimer"
        busy={busy}
        onConfirm={() => void remove()}
        onClose={() => setToDelete(null)}
      />
    </>
  );
}
