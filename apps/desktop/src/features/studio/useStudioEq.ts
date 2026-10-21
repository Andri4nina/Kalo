import { useEffect } from "react";
import { audioMixer } from "@/features/player/audio.mixer";
import { useStudio } from "./studio.store";

export function useStudioEq(): void {
  const enabled = useStudio((state) => state.enabled);
  const gains = useStudio((state) => state.gains);
  const preamp = useStudio((state) => state.preamp);
  const effects = useStudio((state) => state.effects);
  useEffect(() => audioMixer.setEq(gains, enabled), [gains, enabled]);
  useEffect(() => audioMixer.setPreamp(preamp), [preamp]);
  useEffect(() => audioMixer.setEffects(effects, enabled), [effects, enabled]);
}
