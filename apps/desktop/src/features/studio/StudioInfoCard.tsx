import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

const points = [
  "L'égaliseur et les effets agissent en temps réel sur la lecture.",
  "Aucun fichier audio n'est modifié.",
  "Les réglages et presets restent sur cet appareil.",
  "L'export audio n'est pas encore disponible.",
];

export function StudioInfoCard() {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <ShieldCheck size={17} className="text-kalo-accent dark:text-kalo-dark-accent" />
        <h2 className="font-display text-lg">Traitement local</h2>
      </div>
      <ul className={cn("mt-3 space-y-2 text-xs", muted)}>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </Card>
  );
}
