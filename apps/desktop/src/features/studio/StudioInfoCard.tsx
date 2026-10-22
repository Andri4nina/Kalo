import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

const points = [
  "L'égaliseur et les effets agissent en temps réel sur la lecture.",
  "L'export WAV écrit un nouveau fichier, jamais l'original.",
  "Les réglages et presets restent sur cet appareil.",
  "Le rendu d'export se fait hors ligne, sans réseau.",
];

export function StudioInfoCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck size={17} className="text-kalo-accent dark:text-kalo-dark-accent" />
        <h2 className="font-display font-bold tracking-tight text-lg">Traitement local</h2>
      </div>
      <ul className={cn("mt-3 space-y-2 text-xs", muted)}>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </Card>
  );
}
