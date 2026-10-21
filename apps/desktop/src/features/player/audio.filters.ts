import { BANDS } from "@/features/studio/eq";

export function createFilters(ctx: BaseAudioContext): BiquadFilterNode[] {
  return BANDS.map((hz, index) => {
    const filter = ctx.createBiquadFilter();
    filter.type = index === 0 ? "lowshelf" : index === BANDS.length - 1 ? "highshelf" : "peaking";
    filter.frequency.value = hz;
    filter.Q.value = 1.1;
    filter.gain.value = 0;
    return filter;
  });
}
