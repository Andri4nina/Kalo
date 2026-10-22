import { RotateCcw } from "lucide-react";
import { Card } from "@/components/Card";
import { SwitchRow } from "@/components/SwitchRow";
import { muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { cn } from "@/lib/cn";

export function PlaybackCard() {
  const resumeOnLaunch = usePlayer((state) => state.resumeOnLaunch);
  const setResumeOnLaunch = usePlayer((state) => state.setResumeOnLaunch);
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
        <RotateCcw size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Lecture
      </h2>
      <p className={cn("mt-1 text-xs leading-relaxed", muted)}>
        La file et la position sont enregistrées localement. Au prochain lancement, Kalo reprend au dernier point écouté.
      </p>
      <SwitchRow
        label="Reprendre la lecture au lancement"
        description="Désactivez pour démarrer en pause au début du morceau."
        checked={resumeOnLaunch}
        onChange={setResumeOnLaunch}
      />
    </Card>
  );
}
