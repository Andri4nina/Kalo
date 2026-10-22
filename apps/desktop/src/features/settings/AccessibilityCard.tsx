import { Accessibility } from "lucide-react";
import { Card } from "@/components/Card";
import { SwitchRow } from "@/components/SwitchRow";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useAccessibility } from "./accessibility";

export function AccessibilityCard() {
  const reduceMotion = useAccessibility((state) => state.reduceMotion);
  const toggle = useAccessibility((state) => state.toggle);
  return (
    <Card className="p-5">
      <h2 className="flex items-center gap-2 font-display font-bold tracking-tight text-lg">
        <Accessibility size={18} className="text-kalo-accent dark:text-kalo-dark-accent" aria-hidden />
        Accessibilité
      </h2>
      <p className={cn("mt-1 text-xs", muted)}>
        Réduisez les animations si elles vous gênent. Le réglage est conservé sur cet appareil.
      </p>
      <SwitchRow
        label="Réduire les animations"
        description="Désactive les transitions et les animations décoratives."
        checked={reduceMotion}
        onChange={toggle}
      />
    </Card>
  );
}
