import { effectiveGain, MIX_STEMS, type Levels } from "./mixer.levels";
import type { StemBuffers } from "./stem.loader";

export interface Voice {
  source: AudioBufferSourceNode;
  gain: GainNode;
  pan: StereoPannerNode;
}

export type Voices = Map<keyof StemBuffers, Voice>;

/** Crée une voix par piste (et l'original), toutes calées sur le même instant. */
export function startVoices(context: AudioContext, buffers: StemBuffers, offset: number): { voices: Voices; at: number } {
  const voices: Voices = new Map();
  const at = context.currentTime + 0.05;
  for (const name of [...MIX_STEMS, "original"] as const) {
    const source = new AudioBufferSourceNode(context, { buffer: buffers[name] });
    const gain = new GainNode(context);
    const pan = new StereoPannerNode(context);
    source.connect(gain).connect(pan).connect(context.destination);
    source.start(at, Math.min(offset, buffers[name].duration));
    voices.set(name, { source, gain, pan });
  }
  return { voices, at };
}

/** Volumes et panoramiques en direct ; l'original ne sonne qu'en mode comparaison. */
export function applyLevels(voices: Voices, context: AudioContext, levels: Levels, original: boolean): void {
  for (const name of MIX_STEMS) {
    const voice = voices.get(name);
    if (!voice) continue;
    voice.gain.gain.setTargetAtTime(effectiveGain(levels[name], original), context.currentTime, 0.02);
    voice.pan.pan.value = levels[name].pan;
  }
  voices.get("original")?.gain.gain.setTargetAtTime(original ? 1 : 0, context.currentTime, 0.02);
}

export function stopVoices(voices: Voices): void {
  for (const voice of voices.values()) {
    voice.source.stop();
    voice.source.disconnect();
  }
  voices.clear();
}
