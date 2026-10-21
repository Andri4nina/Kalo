import { RotateCcw } from "lucide-react";
import { Card } from "@/components/Card";
import { focus, muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { cn } from "@/lib/cn";

export function PlaybackCard() {
  const resumeOnLaunch = usePlayer((state) => state.resumeOnLaunch);
  const setResumeOnLaunch = usePlayer((state) => state.setResumeOnLaunch);
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display text-lg">
        <RotateCcw size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Lecture
      </h2>
      <p className={cn("mt-1 text-xs leading-relaxed", muted)}>
        La file et la position sont enregistrées localement. Au prochain lancement, Kalo reprend au dernier point écouté.
      </p>
      <button
        type="button"
        role="switch"
        aria-checked={resumeOnLaunch}
        onClick={() => setResumeOnLaunch(!resumeOnLaunch)}
        className={cn("mt-4 flex w-full items-center justify-between gap-4 rounded-xl border p-3 text-left text-xs", focus, "border-kalo-line dark:border-kalo-dark-line")}
      >
        <span>
          <span className="block font-medium">Reprendre la lecture au lancement</span>
          <span className={cn("mt-0.5 block", muted)}>Désactivez pour démarrer en pause au début du morceau.</span>
        </span>
        <span aria-hidden className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", resumeOnLaunch ? "bg-kalo-accent dark:bg-kalo-dark-accent" : "bg-kalo-line dark:bg-kalo-dark-line")}>
          <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-kalo-panel transition-transform dark:bg-kalo-dark-panel", resumeOnLaunch ? "left-4" : "left-0.5")} />
        </span>
      </button>
    </Card>
  );
}