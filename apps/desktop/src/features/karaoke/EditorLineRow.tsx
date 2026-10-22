import { Crosshair, Minus, Play, Plus } from "lucide-react";
import { IconButton } from "@/components/IconButton";
import { focus, muted } from "@/design/tokens";
import { audioTransport } from "@/features/player/audio.transport";
import { cn } from "@/lib/cn";
import type { EditLine } from "./lrc.edit";
import { formatStamp } from "./lrc.format";

interface Props {
  line: EditLine;
  index: number;
  current: boolean;
  onSelect: () => void;
  onPlace: () => void;
  onShift: (deltaMs: number) => void;
}

/** Ligne d'éditeur : horodatage, texte, réglage fin au dixième de seconde. */
export function EditorLineRow({ line, index, current, onSelect, onPlace, onShift }: Props) {
  const stamped = line.timeMs !== null;
  return (
    <li className={cn("flex items-center gap-2 rounded-md px-2 py-1", current ? "bg-kalo-accent-soft dark:bg-kalo-dark-accent-soft" : "hover:bg-kalo-raised/60 dark:hover:bg-kalo-dark-raised/60")}>
      <span className={cn("w-16 shrink-0 text-xs tabular-nums", stamped ? "font-semibold" : muted)}>
        {line.timeMs !== null ? formatStamp(line.timeMs) : "--:--.--"}
      </span>
      <button type="button" onClick={onSelect} aria-current={current ? "step" : undefined} className={cn(focus, "min-w-0 flex-1 truncate rounded text-left text-sm")}>
        {line.text}
      </button>
      <IconButton icon={Minus} label={`Avancer la ligne ${index + 1} de 0,1 s`} size="sm" disabled={!stamped} onClick={() => onShift(-100)} />
      <IconButton icon={Plus} label={`Retarder la ligne ${index + 1} de 0,1 s`} size="sm" disabled={!stamped} onClick={() => onShift(100)} />
      <IconButton icon={Crosshair} label={`Placer la ligne ${index + 1} à la position actuelle`} size="sm" onClick={onPlace} />
      <IconButton
        icon={Play}
        label={`Écouter depuis la ligne ${index + 1}`}
        size="sm"
        disabled={!stamped}
        onClick={() => line.timeMs !== null && audioTransport.seek(line.timeMs)}
      />
    </li>
  );
}
