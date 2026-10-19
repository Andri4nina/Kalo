import { Modal } from "@/components/Modal";
import { CreatePlaylistInline } from "./CreatePlaylistInline";
import { PlaylistChoices } from "./PlaylistChoices";
import { usePlaylistPicker } from "./usePlaylistPicker";

interface Props {
  open: boolean;
  trackId: number;
  onClose: () => void;
}

export function AddToPlaylistModal({ open, trackId, onClose }: Props) {
  const { playlists, busy, error, attach, createAndAttach } = usePlaylistPicker(open, trackId, onClose);
  return (
    <Modal open={open} title="Ajouter à une playlist" onClose={onClose}>
      {error ? <p className="mb-3 text-xs text-kalo-danger dark:text-kalo-dark-danger">{error}</p> : null}
      <PlaylistChoices playlists={playlists} busy={busy} onSelect={(id) => void attach(id)} />
      <CreatePlaylistInline busy={busy} onCreate={(name) => void createAndAttach(name)} />
    </Modal>
  );
}
