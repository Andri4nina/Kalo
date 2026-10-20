import { ConfirmModal } from "@/components/ConfirmModal";
import { fileName } from "@/lib/fileName";

interface Props {
  file: string | null;
  busy: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function RestoreDialog({ file, busy, onConfirm, onClose }: Props) {
  const name = file ? fileName(file) : "";
  return (
    <ConfirmModal
      open={file !== null}
      title="Restaurer une sauvegarde"
      description={`La bibliothèque, les playlists et les favoris actuels seront remplacés par le contenu de « ${name} ». Les fichiers audio ne seront pas modifiés.`}
      confirmLabel="Restaurer"
      busyLabel="Restauration..."
      busy={busy}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}
