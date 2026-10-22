import { Link } from "react-router-dom";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { reveal, stretched } from "./media.styles";
import { PlayCircleButton } from "./PlayCircleButton";

interface MediaCardProps {
  to: string;
  title: string;
  subtitle: string;
  artwork: React.ReactNode;
  onPlay?: () => void;
  playBusy?: boolean;
  action?: React.ReactNode;
}

/** Carte verticale (pochette carrée, titre, sous-titre) avec lecture au survol. */
export function MediaCard({ to, title, subtitle, artwork, onPlay, playBusy, action }: MediaCardProps) {
  return (
    <div className="group relative rounded-lg p-3 transition-colors hover:bg-kalo-card dark:hover:bg-kalo-dark-card">
      <div className="relative">
        {artwork}
        {onPlay ? (
          <PlayCircleButton
            label={`Lire ${title}`}
            busy={playBusy}
            onClick={onPlay}
            className={cn("absolute bottom-2 right-2 z-10", reveal)}
          />
        ) : null}
      </div>
      <div className="mt-3 flex items-start gap-1">
        <div className="min-w-0 flex-1">
          <Link to={to} className={cn("block truncate text-sm font-bold", stretched)}>{title}</Link>
          <p className={cn("mt-1 truncate text-xs", muted)}>{subtitle}</p>
        </div>
        {action ? <div className="relative z-10 -mr-1 -mt-1">{action}</div> : null}
      </div>
    </div>
  );
}
