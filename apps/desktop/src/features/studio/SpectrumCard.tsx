import { useRef } from "react";
import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useSpectrum } from "./useSpectrum";

/** Analyseur de spectre du son de Kalo, après égaliseur et effets. */
export function SpectrumCard() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useSpectrum(canvas);
  return (
    <Card className="p-5 xl:col-span-3">
      <h2 className="font-display text-lg font-bold tracking-tight">Spectre</h2>
      <p className={cn("mt-1 text-xs", muted)}>
        Son traité de 20 Hz (à gauche) à 20 kHz (à droite). L'affichage se fige quand la lecture est en pause.
      </p>
      <canvas
        ref={canvas}
        role="img"
        aria-label="Spectre de fréquences du morceau en cours"
        className="mt-4 h-32 w-full rounded-md bg-kalo-raised dark:bg-kalo-dark-raised"
      />
    </Card>
  );
}
