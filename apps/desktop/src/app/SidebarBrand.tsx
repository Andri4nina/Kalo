import { AudioLines } from "lucide-react";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

export function SidebarBrand() {
  return (
    <div className="mb-3 flex items-center justify-center gap-2.5 lg:justify-start lg:px-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kalo-accent text-kalo-accent-ink dark:bg-kalo-dark-accent">
        <AudioLines size={19} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <div className="hidden lg:block">
        <p className="font-display text-xl font-black leading-none tracking-tight">Kalo</p>
        <p className={cn("mt-1 text-[11px]", muted)}>Lecteur local</p>
      </div>
    </div>
  );
}
