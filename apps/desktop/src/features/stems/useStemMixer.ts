import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/features/player/player.store";
import type { StemJob } from "@/types";
import { clampPan, clampVolume, preset, type ChannelLevel, type Levels, type MixPreset, type MixStem } from "./mixer.levels";
import type { StemPlayer } from "./stem.player";
import { useStemLoad } from "./useStemLoad";

/** Mixeur d'une séparation : lecture synchronisée, niveaux, comparaison à l'original. */
export function useStemMixer(job: StemJob | null) {
  const player = useRef<StemPlayer | null>(null);
  const state = useStemLoad(job, player);
  const [levels, setLevels] = useState<Levels>(() => preset("all"));
  const [original, setOriginal] = useState(false);
  useEffect(() => player.current?.apply(levels, original), [levels, original]);

  const toggle = () => {
    const engine = player.current;
    if (!engine) return;
    if (engine.playing) {
      engine.pause();
      return;
    }
    usePlayer.getState().setPlaying(false);
    if (engine.position() >= engine.buffers.vocals.duration - 0.05) engine.seek(0, levels, original);
    engine.play(levels, original);
  };
  const seek = (seconds: number) => player.current?.seek(seconds, levels, original);
  const setLevel = (stem: MixStem, patch: Partial<ChannelLevel>) =>
    setLevels((current) => {
      const next = { ...current[stem], ...patch };
      return { ...current, [stem]: { ...next, volume: clampVolume(next.volume), pan: clampPan(next.pan) } };
    });
  const applyPreset = (name: MixPreset) => setLevels(preset(name));
  return { ...state, levels, original, toggle, seek, setLevel, applyPreset, setOriginal, player };
}

export type StemMixer = ReturnType<typeof useStemMixer>;
