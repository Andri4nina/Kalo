import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { Modal } from "@/components/Modal";
import type { M3uFeedback } from "./usePlaylistM3u";

interface Props {
  feedback: M3uFeedback | null;
  onClose: () => void;
}

export function M3uFeedbackModal({ feedback, onClose }: Props) {
  return (
    <Modal open={feedback !== null} title={feedback?.title ?? ""} onClose={onClose}>
      {feedback?.error ? <ErrorNotice message={feedback.message} /> : (
        <p className="flex items-start gap-2 text-sm text-kalo-muted dark:text-kalo-dark-muted">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
          {feedback?.message}
        </p>
      )}
      <div className="mt-5 flex justify-end"><Button size="sm" onClick={onClose}>Fermer</Button></div>
    </Modal>
  );
}