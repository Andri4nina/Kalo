import { Accessibility } from "lucide-react";
import { Card } from "@/components/Card";
import { focus, muted } from "@/design/tokens";
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
      <button
        type="button"
        role="switch"
        aria-checked={reduceMotion}
        onClick={toggle}
        className={cn("mt-4 flex w-full items-center justify-between gap-4 rounded-md border p-3 text-left text-xs", focus, "border-kalo-line dark:border-kalo-dark-line")}
      >
        <span>
          <span className="block font-medium">Réduire les animations</span>
          <span className={cn("mt-0.5 block", muted)}>Désactive les transitions et les animations décoratives.</span>
        </span>
        <span aria-hidden className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", reduceMotion ? "bg-kalo-accent dark:bg-kalo-dark-accent" : "bg-kalo-line dark:bg-kalo-dark-line")}>
          <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-kalo-panel transition-transform dark:bg-kalo-dark-panel", reduceMotion ? "left-4" : "left-0.5")} />
        </span>
      </button>
    </Card>
  );
}
