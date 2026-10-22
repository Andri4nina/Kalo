import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/theme";
import { IconButton } from "@/components/IconButton";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

export function SidebarFooter() {
  const theme = useTheme((state) => state.theme);
  const toggle = useTheme((state) => state.toggle);
  return (
    <div className="mt-2 flex flex-col items-center gap-2 lg:flex-row lg:justify-between lg:px-3">
      <span className={cn("hidden text-[11px] lg:inline", muted)}>Kalo v0.1.0</span>
      <IconButton
        icon={theme === "dark" ? Sun : Moon}
        label={theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"}
        onClick={toggle}
      />
    </div>
  );
}
