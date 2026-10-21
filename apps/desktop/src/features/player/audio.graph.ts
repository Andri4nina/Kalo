import { buildChain } from "./audio.chain";
import type { AudioGraph } from "./audio.graph.types";

export type { AudioGraph } from "./audio.graph.types";

export function createGraph(audio: HTMLAudioElement): AudioGraph {
  const ctx = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  return { ctx, ...buildChain(ctx, source) };
}
