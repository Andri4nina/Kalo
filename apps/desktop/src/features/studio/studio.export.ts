import { buildChain } from "@/features/player/audio.chain";
import { assetUrl } from "@/lib/assets";
import { applyEffects } from "./effects.apply";
import { preampGain } from "./eq";
import type { StudioSnapshot } from "./studio.types";
import { encodeWav, toBase64 } from "./wav";

export async function renderTrackWav(path: string, snapshot: StudioSnapshot): Promise<string> {
  const url = assetUrl(path);
  if (!url) throw new Error("Fichier audio inaccessible.");
  const response = await fetch(url);
  if (!response.ok) throw new Error("Lecture du fichier audio impossible.");
  const decoded = await decode(await response.arrayBuffer());
  const offline = new OfflineAudioContext(decoded.numberOfChannels, decoded.length, decoded.sampleRate);
  const source = offline.createBufferSource();
  source.buffer = decoded;
  const chain = buildChain(offline, source);
  chain.preamp.gain.value = preampGain(snapshot.preamp);
  chain.filters.forEach((filter, index) => {
    filter.gain.value = snapshot.enabled ? (snapshot.gains[index] ?? 0) : 0;
  });
  applyEffects(chain, snapshot.effects, snapshot.enabled);
  source.start(0);
  return toBase64(encodeWav(await offline.startRendering()));
}

async function decode(bytes: ArrayBuffer): Promise<AudioBuffer> {
  try {
    return await new OfflineAudioContext(1, 1, 44100).decodeAudioData(bytes);
  } catch {
    throw new Error("Format audio non pris en charge pour l'export.");
  }
}
