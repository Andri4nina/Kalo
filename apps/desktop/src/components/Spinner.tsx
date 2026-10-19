import { LoaderCircle } from "lucide-react";
import { muted } from "@/design/tokens";

export function Spinner({ label = "Chargement" }: { label?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 py-10 text-xs ${muted}`}>
      <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
