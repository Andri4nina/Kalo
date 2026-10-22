import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

/** Paroles classiques, sans synchronisation (fichier .txt ou texte libre). */
export function PlainLyrics({ text }: { text: string }) {
  return (
    <div>
      <p className={cn("mb-3 text-xs", muted)}>
        Paroles non synchronisées. Utilisez « Synchroniser » pour les caler sur la musique.
      </p>
      <div className="max-h-[58vh] overflow-y-auto whitespace-pre-line rounded-lg bg-kalo-card p-4 text-sm leading-relaxed dark:bg-kalo-dark-card">
        {text}
      </div>
    </div>
  );
}
