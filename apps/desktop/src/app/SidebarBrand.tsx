import { AudioLines } from "lucide-react";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

export function SidebarBrand() {
  return (
    <div className="mb-6 flex items-center gap-2.5 px-1 lg:px-2">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-kalo-accent text-kalo-accent-ink dark:bg-kalo-dark-accent">
        <AudioLines size={19} strokeWidth={2.2} />
      </span>
      <div className="hidden lg:block">
        <p className="font-display text-lg leading-none">Kalo</p>
        <p className={cn("mt-1 text-[10px] uppercase tracking-[0.16em]", muted)}>Lecteur local</p>
      </div>
    </div>
  );
}
