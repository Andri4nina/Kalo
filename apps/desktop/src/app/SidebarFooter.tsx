import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/theme";
import { IconButton } from "@/components/IconButton";
import { divider, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

export function SidebarFooter() {
  const theme = useTheme((state) => state.theme);
  const toggle = useTheme((state) => state.toggle);
  return (
    <>
      <div className={divider} />
      <div className="flex flex-col items-center gap-2 pt-3 lg:flex-row lg:justify-between">
        <span className={cn("hidden text-[10px] lg:inline", muted)}>v0.1.0</span>
        <IconButton
          icon={theme === "dark" ? Sun : Moon}
          label={theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"}
          onClick={toggle}
        />
      </div>
    </>
  );
}
