import { Card } from "@/components/Card";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

const rows = [
  ["Version", "0.1.0"],
  ["Licence", "MIT"],
  ["Interface", "React, TypeScript, Tailwind"],
  ["Cœur", "Rust, SQLite, Tauri 2"],
  ["Mode", "Local et hors ligne"],
];

export function AboutCard() {
  return (
    <Card className="p-5">
      <h2 className="font-display text-lg">À propos de Kalo</h2>
      <p className={cn("mt-1 text-xs leading-relaxed", muted)}>
        Un lecteur musical open source, pensé pour rester léger et respectueux de vos fichiers.
      </p>
      <dl className="mt-4 space-y-2 text-xs">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4">
            <dt className={muted}>{label}</dt>
            <dd className="text-right font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
