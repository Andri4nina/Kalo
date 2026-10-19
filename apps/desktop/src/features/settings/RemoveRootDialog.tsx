import { ConfirmModal } from "@/components/ConfirmModal";
import type { LibraryRoot } from "@/types";

interface Props {
  target: LibraryRoot | null;
  busy: boolean;
  scanning: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function RemoveRootDialog({ target, busy, scanning, onConfirm, onClose }: Props) {
  const suffix = scanning ? " Attendez la fin de l'analyse en cours." : "";
  return (
    <ConfirmModal
      open={target !== null}
      title="Retirer ce dossier ?"
      description={`${target?.path ?? ""} sera retiré de la bibliothèque Kalo. Les fichiers audio restent sur votre disque.${suffix}`}
      confirmLabel="Retirer"
      busy={busy}
      confirmDisabled={scanning}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
