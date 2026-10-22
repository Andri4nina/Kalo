import { ListMusic } from "lucide-react";
import { cn } from "@/lib/cn";
import { modeButton, modeOff, modeOn } from "./player.control.styles";
import { usePlayer } from "./player.store";

export function QueueButton() {
  const count = usePlayer((state) => state.queue.length);
  const open = usePlayer((state) => state.queueOpen);
  const setOpen = usePlayer((state) => state.setQueueOpen);
  return (
    <button
      type="button"
      aria-label="Ouvrir la file d'attente"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(modeButton, open ? modeOn : modeOff)}
    >
      <ListMusic size={18} strokeWidth={1.9} />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-kalo-accent px-1 text-[9px] font-bold text-kalo-accent-ink dark:bg-kalo-dark-accent">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </button>
  );
}
