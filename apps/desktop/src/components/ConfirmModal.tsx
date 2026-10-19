import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  busy?: boolean;
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal(props: ConfirmModalProps) {
  return (
    <Modal open={props.open} title={props.title} onClose={props.onClose}>
      <p className="text-sm text-kalo-muted dark:text-kalo-dark-muted">{props.description}</p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={props.onClose} disabled={props.busy}>Annuler</Button>
        <Button variant="danger" size="sm" onClick={props.onConfirm} disabled={props.busy || props.confirmDisabled}>
          {props.busy ? "Suppression..." : (props.confirmLabel ?? "Confirmer")}
        </Button>
      </div>
    </Modal>
  );
}
