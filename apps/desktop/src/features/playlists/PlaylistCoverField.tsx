import { ImageMinus, ImagePlus } from "lucide-react";
import { Button } from "@/components/Button";
import { ErrorNotice } from "@/components/ErrorNotice";
import { muted } from "@/design/tokens";
import { cn } from "@/lib/cn";
import type { Playlist } from "@/types";
import { PlaylistArtwork } from "./PlaylistArtwork";
import { usePlaylistCover } from "./usePlaylistCover";

/** Pochette de playlist : image copiée dans le cache Kalo, ou retirée. */
export function PlaylistCoverField({ playlist }: { playlist: Playlist }) {
  const { cover, busy, error, choose, clear } = usePlaylistCover(playlist);
  return (
    <div className="mb-4 flex flex-wrap items-start gap-3">
      <div className="w-24"><PlaylistArtwork size="square" src={cover} /></div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <Button variant="subtle" size="sm" disabled={busy} onClick={() => void choose()}>
          <ImagePlus size={14} aria-hidden /> {busy ? "Copie..." : "Choisir une image"}
        </Button>
        {cover ? (
          <Button variant="ghost" size="sm" disabled={busy} onClick={() => void clear()}>
            <ImageMinus size={14} aria-hidden /> Retirer la pochette
          </Button>
        ) : null}
        <p className={cn("text-[11px]", muted)}>L'image est copiée dans le cache Kalo ; l'original n'est pas modifié.</p>
        {error ? <ErrorNotice message={error} /> : null}
      </div>
    </div>
  );
}
