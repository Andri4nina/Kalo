import type { AudioGraph } from "./audio.graph.types";

let current: AudioGraph | null = null;

/** Graphe audio actif (créé à la première lecture), pour l'analyseur et l'égaliseur. */
export function setGraph(graph: AudioGraph): void {
  current = graph;
}

export function currentGraph(): AudioGraph | null {
  return current;
}
