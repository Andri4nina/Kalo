import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Modal } from "@/components/Modal";
import type { Track } from "@/types";
import { CoverPicker } from "./CoverPicker";
import { EditTrackFields } from "./EditTrackFields";
import { useEditTrack } from "./useEditTrack";

interface Props {
  open: boolean;
  track: Track;
  onClose: () => void;
}

export function EditTrackModal({ open, track, onClose }: Props) {
  const values = useEditTrack(track, onClose);
  return (
    <Modal open={open} title="Modifier les métadonnées" onClose={onClose}>
      <p className="mb-4 text-xs text-kalo-muted dark:text-kalo-dark-muted">
        Seules les informations de la bibliothèque changent ; le fichier audio n'est pas modifié.
      </p>
      {values.error ? <ErrorNotice message={values.error} /> : null}
      <CoverPicker track={track} onDone={onClose} />
      <EditTrackFields values={values} />
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onClose} disabled={values.busy}>Annuler</Button>
        <Button size="sm" onClick={() => void values.submit()} disabled={values.busy || !values.valid}>
          {values.busy ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </Modal>
  );
}