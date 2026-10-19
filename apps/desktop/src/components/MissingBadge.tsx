import { AlertTriangle } from "lucide-react";

export function MissingBadge() {
  return (
    <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-kalo-danger dark:text-kalo-dark-danger">
      <AlertTriangle size={11} aria-hidden /> Fichier introuvable
    </span>
  );
}
