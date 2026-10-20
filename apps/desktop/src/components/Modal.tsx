import { X } from "lucide-react";
import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/Card";
import { IconButton } from "@/components/IconButton";
import { useDialogFocus } from "./useDialogFocus";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialogFocus(open, overlay, onClose);

  if (!open) return null;
  return createPortal(
    <div
      ref={overlay}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={onClose}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md p-6 shadow-soft"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 id={titleId} className="font-display text-lg">{title}</h2>
          <IconButton icon={X} label="Fermer" onClick={onClose} />
        </div>
        {children}
      </Card>
    </div>,
    document.body,
  );
}
