import type { Track } from "@/types";
import { audioTransport } from "./audio.transport";
import { usePlayer } from "./player.store";

function supported(): boolean {
  return typeof navigator !== "undefined" && "mediaSession" in navigator;
}

export function updateMediaMetadata(track: Track | null): void {
  if (!supported() || typeof MediaMetadata === "undefined") return;
  navigator.mediaSession.metadata = track
    ? new MediaMetadata({
        title: track.title,
        artist: track.artist ?? "Artiste inconnu",
        album: track.album ?? "Kalo",
      })
    : null;
}

export function updateMediaPlaybackState(playing: boolean): void {
  if (!supported()) return;
  navigator.mediaSession.playbackState = playing ? "playing" : "paused";
}

export function bindMediaSession(): void {
  if (!supported()) return;
  const session = navigator.mediaSession;
  const set = (action: MediaSessionAction, handler: MediaSessionActionHandler) => {
    try {
      session.setActionHandler(action, handler);
    } catch {
      // Action non prise en charge par ce WebView.
    }
  };
  set("play", () => usePlayer.getState().setPlaying(true));
  set("pause", () => usePlayer.getState().setPlaying(false));
  set("previoustrack", () => usePlayer.getState().previous());
  set("nexttrack", () => usePlayer.getState().next());
  const seekBy = (seconds: number) => audioTransport.seek(usePlayer.getState().positionMs + seconds * 1000);
  set("seekbackward", (details) => seekBy(-(details.seekOffset ?? 10)));
  set("seekforward", (details) => seekBy(details.seekOffset ?? 10));
  set("seekto", (details) => {
    if (details.seekTime !== undefined) audioTransport.seek(details.seekTime * 1000);
  });
}
