import { Moon, Sun } from "lucide-react";
import { Card } from "@/components/Card";
import { useTheme } from "@/app/theme";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

export function AppearanceCard() {
  const theme = useTheme((state) => state.theme);
  const toggle = useTheme((state) => state.toggle);

  return (
    <Card className="p-5">
      <h2 className="font-display font-bold tracking-tight text-lg">Apparence</h2>
      <p className={cn("mt-1 text-xs", muted)}>Choisissez le thème de l'interface. Le réglage est conservé sur cet appareil.</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          aria-pressed={theme === "dark"}
          onClick={() => theme === "light" && toggle()}
          className={cn(
            "flex flex-col items-start gap-2 rounded-md border p-3 text-left transition-colors",
            focus,
            theme === "dark"
              ? "border-kalo-accent bg-kalo-accent-soft text-kalo-accent-strong dark:border-kalo-dark-accent dark:bg-kalo-dark-accent-soft dark:text-kalo-dark-accent"
              : "border-kalo-line hover:bg-kalo-raised dark:border-kalo-dark-line dark:hover:bg-kalo-dark-raised",
          )}
        >
          <Moon size={17} />
          <span className="text-xs font-medium">Sombre</span>
        </button>
        <button
          type="button"
          aria-pressed={theme === "light"}
          onClick={() => theme === "dark" && toggle()}
          className={cn(
            "flex flex-col items-start gap-2 rounded-md border p-3 text-left transition-colors",
            focus,
            theme === "light"
              ? "border-kalo-accent bg-kalo-accent-soft text-kalo-accent-strong"
              : "border-kalo-line hover:bg-kalo-raised dark:border-kalo-dark-line dark:hover:bg-kalo-dark-raised",
          )}
        >
          <Sun size={17} />
          <span className="text-xs font-medium">Clair</span>
        </button>
      </div>
    </Card>
  );
}
