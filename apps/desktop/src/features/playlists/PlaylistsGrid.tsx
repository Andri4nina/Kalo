import { useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ErrorNotice } from "@/components/ErrorNotice";
import { useLibraryVersion } from "@/features/library/library.store";
import { deletePlaylist } from "@/lib/api/playlists";
import { errorMessage } from "@/lib/format";
import type { Playlist } from "@/types";
import { PlaylistCard } from "./PlaylistCard";

export function PlaylistsGrid({ playlists }: { playlists: Playlist[] }) {
  const [toDelete, setToDelete] = useState<Playlist | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bump = useLibraryVersion((state) => state.bump);

  const remove = async () => {
    if (!toDelete) return;
    setBusy(true);
    setError(null);
    try {
      await deletePlaylist(toDelete.id);
      setToDelete(null);
      bump();
    } catch (reason: unknown) {
      setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {error ? <ErrorNotice message={error} /> : null}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
