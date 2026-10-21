import { useEffect } from "react";
import { recordPlay } from "@/lib/api/listening";
import { audioMixer } from "./audio.mixer";
import { audioTransport } from "./audio.transport";
import { updateMediaMetadata, updateMediaPlaybackState } from "./media.session";
import { useCurrentTrack, usePlayer } from "./player.store";

export function useAudioEngine(): void {
  const track = useCurrentTrack();
  const playing = usePlayer((state) => state.playing);
  const volume = usePlayer((state) => state.volume);
  const balance = usePlayer((state) => state.balance);
  const muted = usePlayer((state) => state.muted);
  const repeat = usePlayer((state) => state.repeat);

  useEffect(() => {
    if (!track) return;
    const resume = usePlayer.getState().resumePositionMs;
    audioTransport.load(track.path, track.id);
    if (resume > 0 && usePlayer.getState().resumeOnLaunch) audioTransport.resume(resume);
    if (usePlayer.getState().playing) {
      audioMixer.ensure();
      void audioTransport.play();
    }
    void recordPlay(track.id).catch(() => undefined);
  }, [track?.id, track?.path]);

  useEffect(() => {
    if (playing) {
      audioMixer.ensure();
      void audioTransport.play();
    } else {
      audioTransport.pause();
    }
  }, [playing, track?.id]);

  useEffect(() => audioMixer.setVolume(muted ? 0 : volume), [volume, muted]);
  useEffect(() => audioMixer.setBalance(balance), [balance]);
  useEffect(() => audioTransport.setLoop(repeat === "one"), [repeat]);
  useEffect(() => updateMediaMetadata(track), [track]);
  useEffect(() => updateMediaPlaybackState(playing), [playing]);
}
