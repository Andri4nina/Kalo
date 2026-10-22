import { applyShape } from "@/features/studio/eq.shape";
import { useEqShape } from "@/features/studio/eq.shape.store";
import { buildChain } from "./audio.chain";
import type { AudioGraph } from "./audio.graph.types";
import { setGraph } from "./audio.registry";

export type { AudioGraph } from "./audio.graph.types";

export function createGraph(audio: HTMLAudioElement): AudioGraph {
  const ctx = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  const graph = { ctx, ...buildChain(ctx, source) };
  applyShape(graph.filters, useEqShape.getState().bands);
  setGraph(graph);
  return graph;
}
