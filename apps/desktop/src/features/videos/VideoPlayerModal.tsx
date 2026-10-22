import { useEffect } from "react";
import { Modal } from "@/components/Modal";
import { muted } from "@/design/tokens";
import { usePlayer } from "@/features/player/player.store";
import { assetUrl } from "@/lib/assets";
import { cn } from "@/lib/cn";
import type { Video } from "@/types";

/** Lecteur vidéo natif ; la musique en cours est mise en pause pour éviter deux sons. */
export function VideoPlayerModal({ video, onClose }: { video: Video; onClose: () => void }) {
  useEffect(() => usePlayer.getState().setPlaying(false), [video.id]);
  const url = assetUrl(video.path);
  return (
    <Modal open title={video.title} onClose={onClose} size="wide">
      {url ? (
        <video src={url} controls autoPlay className="aspect-video w-full rounded-md bg-kalo-dark-canvas">
          <track kind="captions" />
        </video>
      ) : (
        <p className={cn("text-sm", muted)}>Le clip n'est lisible que dans l'application Kalo.</p>
      )}
      <p className={cn("mt-3 truncate text-xs", muted)} title={video.path}>
        {video.artist ?? "Artiste inconnu"} · {video.path}
      </p>
    </Modal>
  );
}
