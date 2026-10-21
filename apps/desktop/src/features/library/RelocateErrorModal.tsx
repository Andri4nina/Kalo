import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Modal } from "@/components/Modal";

interface Props {
  error: string | null;
  onClose: () => void;
}

export function RelocateErrorModal({ error, onClose }: Props) {
  return (
    <Modal open={error !== null} title="Relocalisation impossible" onClose={onClose}>
      <ErrorNotice message={error ?? ""} />
      <p className="text-xs text-kalo-muted dark:text-kalo-dark-muted">
        Vérifiez que le fichier existe toujours et que son dossier est bien surveillé par la bibliothèque.
      </p>
      <div className="mt-5 flex justify-end">
        <Button size="sm" onClick={onClose}>Fermer</Button>
      </div>
    </Modal>
  );
}