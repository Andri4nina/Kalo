import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

const commitments = [
  "Aucune télémétrie, aucun compte, aucune requête vers un serveur.",
  "Les fichiers audio ne sont jamais modifiés ni déplacés.",
  "Le karaoké lit uniquement un fichier .lrc voisin du morceau.",
  "Les sauvegardes restent des fichiers locaux choisis par vous.",
  "Aucun modèle d'IA ni téléchargement réseau n'est activé dans cette version.",
];

export function PrivacyCard() {
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display text-lg">
        <ShieldCheck size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Confidentialité
      </h2>
      <p className={cn("mt-1 text-xs leading-relaxed", muted)}>
        Kalo fonctionne entièrement en local. Voici les engagements vérifiables de cette version.
      </p>
      <ul className={cn("mt-4 space-y-2 text-xs leading-relaxed", muted)}>
        {commitments.map((item) => <li key={item} className="flex gap-2"><span aria-hidden>—</span><span>{item}</span></li>)}
      </ul>
    </Card>
  );
}