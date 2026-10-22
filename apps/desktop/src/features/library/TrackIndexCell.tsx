import { AudioLines, Play } from "lucide-react";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";

interface Props {
  index: number;
  current: boolean;
  disabled: boolean;
  onPlay: () => void;
}

/**
 * Numéro de piste ; au survol, une icône de lecture (raccourci souris du bouton
 * titre, qui reste l'action accessible au clavier).
 */
export function TrackIndexCell({ index, current, disabled, onPlay }: Props) {
  const playable = !disabled && !current;
  return (
    <td
      onClick={playable ? onPlay : undefined}
      className={cn("w-12 py-2 pl-3 text-right text-sm tabular-nums", playable && "cursor-pointer")}
    >
      <span className="relative inline-flex h-6 w-6 items-center justify-center">
        {current ? (
          <AudioLines size={15} className="text-kalo-accent dark:text-kalo-dark-accent" aria-label="En lecture" />
        ) : (
          <span className={cn(muted, playable && "group-hover:invisible")}>{index + 1}</span>
        )}
        {playable ? (
          <Play
            size={14}
            fill="currentColor"
            aria-hidden="true"
            className="absolute hidden group-hover:block"
          />
        ) : null}
      </span>
    </td>
  );
}
