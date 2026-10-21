import type { AudioGraph } from "@/features/player/audio.graph";
import { clampMix, compressorSettings, distortionCurve, type EffectState } from "./effects";

export function applyEffects(graph: AudioGraph, effects: EffectState, enabled: boolean): void {
  const reverb = enabled ? clampMix(effects.reverb) : 0;
  const echo = enabled ? clampMix(effects.echo) : 0;
  graph.saturator.curve = enabled && effects.drive > 0 ? distortionCurve(effects.drive) : null;
  const settings = compressorSettings(enabled ? effects.compression : 0);
  graph.compressor.threshold.value = settings.threshold;
  graph.compressor.knee.value = settings.knee;
  graph.compressor.ratio.value = settings.ratio;
  graph.compressor.attack.value = settings.attack;
  graph.compressor.release.value = settings.release;
  graph.reverbWet.gain.value = reverb * 0.7;
  graph.echoWet.gain.value = echo * 0.6;
  graph.feedback.gain.value = 0.25 + echo * 0.35;
}
