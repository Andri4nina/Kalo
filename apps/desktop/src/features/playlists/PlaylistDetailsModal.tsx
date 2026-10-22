import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { TextArea } from "@/components/TextArea";
import { TextField } from "@/components/TextField";
import type { Playlist } from "@/types";
import { PlaylistCoverField } from "./PlaylistCoverField";
import { usePlaylistDetailsForm } from "./usePlaylistDetailsForm";

interface Props {
  playlist: Playlist;
  open: boolean;
  onClose: () => void;
}

export function PlaylistDetailsModal({ playlist, open, onClose }: Props) {
  const form = usePlaylistDetailsForm(playlist, onClose);
  return (
    <Modal open={open} title="Modifier la playlist" onClose={onClose}>
      {form.error ? <p role="alert" className="mb-3 text-xs text-kalo-danger dark:text-kalo-dark-danger">{form.error}</p> : null}
      <PlaylistCoverField playlist={playlist} />
      <div className="flex flex-col gap-3">
        <TextField label="Nom" value={form.name} onChange={(event) => form.setName(event.target.value)} maxLength={80} />
        <TextArea
          label="Description"
          value={form.description}
          onChange={(event) => form.setDescription(event.target.value)}
          maxLength={500}
          hint={`${form.description.length} / 500`}
        />
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={form.busy}>Annuler</Button>
        <Button size="sm" onClick={() => void form.submit()} disabled={form.busy || form.name.trim().length === 0}>
          Enregistrer
        </Button>
      </div>
    </Modal>
  );
}
