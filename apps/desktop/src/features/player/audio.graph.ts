import { BANDS } from "@/features/studio/eq";

export interface AudioGraph {
  ctx: AudioContext;
  preamp: GainNode;
  gain: GainNode;
  panner: StereoPannerNode;
  filters: BiquadFilterNode[];
}

export function createGraph(audio: HTMLAudioElement): AudioGraph {
  const ctx = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  const preamp = ctx.createGain();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner();
  const filters = BANDS.map((hz, index) => {
    const filter = ctx.createBiquadFilter();
    filter.type = index === 0 ? "lowshelf" : index === BANDS.length - 1 ? "highshelf" : "peaking";
    filter.frequency.value = hz;
    filter.Q.value = 1.1;
    filter.gain.value = 0;
    return filter;
  });
  source.connect(preamp);
  preamp.connect(gain);
  gain.connect(panner);
  let node: AudioNode = panner;
  for (const filter of filters) {
    node.connect(filter);
    node = filter;
  }
  node.connect(ctx.destination);
  return { ctx, preamp, gain, panner, filters };
}
