export interface AudioChain {
  preamp: GainNode;
  gain: GainNode;
  panner: StereoPannerNode;
  filters: BiquadFilterNode[];
  saturator: WaveShaperNode;
  compressor: DynamicsCompressorNode;
  reverbDry: GainNode;
  reverbWet: GainNode;
  convolver: ConvolverNode;
  echoDry: GainNode;
  echoWet: GainNode;
  delay: DelayNode;
  feedback: GainNode;
}

export type AudioGraph = AudioChain & { ctx: AudioContext };
