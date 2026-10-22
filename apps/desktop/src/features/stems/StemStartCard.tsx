import { Layers } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Cover } from "@/components/Cover";
import { muted } from "@/design/tokens";
import { useCurrentTrack } from "@/features/player/player.store";
import { cn } from "@/lib/cn";

interface Props {
  modelReady: boolean;
  running: boolean;
  onStart: (trackId: number) => void;
}

/** Sépare le morceau en cours de lecture (une séparation à la fois). */
export function StemStartCard({ modelReady, running, onStart }: Props) {
  const track = useCurrentTrack();
  return (
    <Card className="p-5">
      <h2 className="font-display text-lg font-bold tracking-tight">Nouvelle séparation</h2>
      <p className={cn("mt-1 text-xs leading-relaxed", muted)}>
        Voix, batterie, basse, autres et instrumental. Le fichier d'origine n'est jamais modifié ; comptez quelques
        secondes à une minute selon la durée et la machine.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {track ? <Cover src={track.coverPath} size="sm" /> : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{track ? track.title : "Aucun morceau en lecture"}</p>
          <p className={cn("truncate text-xs", muted)}>{track ? (track.artist ?? "Artiste inconnu") : "Lancez un morceau puis revenez ici."}</p>
        </div>
        <Button size="sm" disabled={!track || !modelReady || running} onClick={() => track && onStart(track.id)}>
          <Layers size={15} aria-hidden /> {running ? "Séparation en cours" : "Séparer ce morceau"}
        </Button>
      </div>
      {!modelReady ? <p className={cn("mt-3 text-xs", muted)}>Téléchargez d'abord le modèle ci-dessus.</p> : null}
    </Card>
  );
}
