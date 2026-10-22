import { createFilters } from "./audio.filters";
import type { AudioChain } from "./audio.graph.types";
import { createImpulse } from "./audio.impulse";

export function buildChain(ctx: BaseAudioContext, source: AudioNode): AudioChain {
  const preamp = ctx.createGain();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner();
  const filters = createFilters(ctx);
  const saturator = ctx.createWaveShaper();
  const compressor = ctx.createDynamicsCompressor();
  const reverbDry = ctx.createGain();
  const reverbWet = ctx.createGain();
  reverbWet.gain.value = 0;
  const convolver = ctx.createConvolver();
  convolver.buffer = createImpulse(ctx);
  const echoDry = ctx.createGain();
  const echoWet = ctx.createGain();
  echoWet.gain.value = 0;
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.28;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.25;
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.8;
  source.connect(preamp);
  preamp.connect(gain);
  gain.connect(panner);
  let node: AudioNode = panner;
  for (const filter of filters) { node.connect(filter); node = filter; }
  node.connect(saturator);
  saturator.connect(compressor);
  compressor.connect(reverbDry);
  compressor.connect(convolver);
  convolver.connect(reverbWet);
  reverbDry.connect(echoDry);
  reverbWet.connect(echoDry);
  reverbDry.connect(delay);
  reverbWet.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(echoWet);
  echoDry.connect(ctx.destination);
  echoWet.connect(ctx.destination);
  echoDry.connect(analyser);
  echoWet.connect(analyser);
  return { preamp, gain, panner, filters, saturator, compressor, reverbDry, reverbWet, convolver, echoDry, echoWet, delay, feedback, analyser };
}
