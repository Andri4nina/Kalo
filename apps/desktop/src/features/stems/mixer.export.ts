import { toBase64, encodeWav } from "@/features/studio/wav";
import { effectiveGain, MIX_STEMS, type Levels } from "./mixer.levels";
import type { StemBuffers } from "./stem.loader";

/** Rendu hors ligne du mix courant (niveaux et panoramiques), en WAV base64. */
export async function renderMix(buffers: StemBuffers, levels: Levels): Promise<string> {
  const reference = buffers.vocals;
  const offline = new OfflineAudioContext(2, reference.length, reference.sampleRate);
  for (const stem of MIX_STEMS) {
    const source = new AudioBufferSourceNode(offline, { buffer: buffers[stem] });
    const gain = new GainNode(offline, { gain: effectiveGain(levels[stem], false) });
    const pan = new StereoPannerNode(offline, { pan: levels[stem].pan });
    source.connect(gain).connect(pan).connect(offline.destination);
    source.start(0);
  }
  return toBase64(encodeWav(await offline.startRendering()));
}
