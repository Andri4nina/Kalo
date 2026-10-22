import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useStudio } from "./studio.store";

export function CompareCard() {
  const compare = useStudio((state) => state.compare);
  const toggleCompare = useStudio((state) => state.toggleCompare);
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
        <ArrowLeftRight size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Comparaison A/B
      </h2>
      <p className={cn("mt-1 text-xs", muted)}>Écoutez le signal sans traitement, puis revenez au réglage conservé.</p>
      <Button className="mt-3" size="sm" variant={compare ? "primary" : "subtle"} aria-pressed={compare} onClick={toggleCompare}>
        <ArrowLeftRight size={14} aria-hidden />
        {compare ? "Revenir au traitement" : "Écouter sans traitement"}
      </Button>
    </Card>
  );
}
