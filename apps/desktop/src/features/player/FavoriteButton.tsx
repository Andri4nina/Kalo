import { Heart } from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/IconButton";
import { useLibraryVersion } from "@/features/library/library.store";
import { usePlayer } from "@/features/player/player.store";
import { toggleFavorite } from "@/lib/api/listening";
import { errorMessage } from "@/lib/format";
import type { Track } from "@/types";

export function FavoriteButton({ track, size = "sm" }: { track: Track; size?: "sm" | "md" }) {
  const [busy, setBusy] = useState(false);
  const bump = useLibraryVersion((state) => state.bump);

  const onClick = async () => {
    setBusy(true);
    try {
      const favorite = await toggleFavorite(track.id);
      usePlayer.getState().patchTrack(track.id, { favorite });
      bump();
    } catch (reason: unknown) {
      usePlayer.getState().setError(errorMessage(reason));
    } finally {
      setBusy(false);
    }
  };

  return (
    <IconButton
      icon={Heart}
      label={track.favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      active={track.favorite}
      size={size}
      disabled={busy}
      onClick={() => void onClick()}
      className={track.favorite ? "fill-current" : undefined}
    />
  );
}
