import { useEffect } from "react";
import { audioMixer } from "@/features/player/audio.mixer";
import { currentGraph } from "@/features/player/audio.registry";
import { applyShape } from "./eq.shape";
import { useEqShape } from "./eq.shape.store";
import { useStudio } from "./studio.store";

export function useStudioEq(): void {
  const enabled = useStudio((state) => state.enabled);
  const gains = useStudio((state) => state.gains);
  const preamp = useStudio((state) => state.preamp);
  const effects = useStudio((state) => state.effects);
  const bands = useEqShape((state) => state.bands);
  useEffect(() => audioMixer.setEq(gains, enabled), [gains, enabled]);
  useEffect(() => audioMixer.setPreamp(preamp), [preamp]);
  useEffect(() => audioMixer.setEffects(effects, enabled), [effects, enabled]);
  useEffect(() => {
    const graph = currentGraph();
    if (graph) applyShape(graph.filters, bands);
  }, [bands]);
}
