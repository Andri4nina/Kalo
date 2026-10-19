export interface AudioGraph {
  ctx: AudioContext;
  gain: GainNode;
  panner: StereoPannerNode;
}

export function createGraph(audio: HTMLAudioElement): AudioGraph {
  const ctx = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner();
  source.connect(gain);
  gain.connect(panner);
  panner.connect(ctx.destination);
  return { ctx, gain, panner };
}
