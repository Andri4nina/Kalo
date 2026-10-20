import { Captions, Music2, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Cover } from "@/components/Cover";
import { IconButton } from "@/components/IconButton";
import { focus, muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import { useCurrentTrack } from "./player.store";
import { FavoriteButton } from "./FavoriteButton";

export function PlayerTrackInfo() {
  const track = useCurrentTrack();
  if (!track) {
    return (
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-kalo-raised dark:bg-kalo-dark-raised">
          <Music2 size={18} className={muted} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Aucune lecture</p>
          <p className={cn("truncate text-xs", muted)}>Choisissez un morceau dans la bibliothèque</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Cover src={track.coverPath} />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{track.title}</p>
        <p className={cn("truncate text-xs", muted)}>{track.artist ?? "Artiste inconnu"}</p>
      </div>
      <FavoriteButton track={track} />
      <Link to="/karaoke" aria-label="Ouvrir le karaoké" title="Karaoké" className={cn("rounded-full", focus)}>
        <IconButton icon={Captions} label="Karaoké" />
      </Link>
      <Link to="/studio" aria-label="Ouvrir le studio audio" title="Studio audio" className={cn("rounded-full", focus)}>
        <IconButton icon={SlidersHorizontal} label="Studio audio" />
      </Link>
    </div>
  );
}
